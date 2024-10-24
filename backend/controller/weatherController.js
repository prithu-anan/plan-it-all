const axios = require('axios');


// Helper to parse 'YYYY-MM-DD HH:mm' to a Date object
function parseDateTime(dateTime) {
  return new Date(dateTime);
}

async function getFilteredWeatherData(req,res) {

    console.log('getFilteredWeatherData called');

    const { startDate, endDate, location } = req.body;
    console.log(startDate, endDate, location);
  
    const apiUrl = 'http://api.weatherapi.com/v1/forecast.json';
    const apiKey = 'fdca2f6e4dc44050a81130232242410'; // Replace with your valid API key
  
    const today = new Date();
    const maxForecastDays = 10;
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxForecastDays);
  
    // Validate the forecast limit
    if (new Date(endDate) > maxDate) {
      return res.json({
        success: false,
        message: `End date cannot be more than ${maxForecastDays} days from today.`,
      });
    }
  
    console.log('Fetching from the Weather API...');
  
    try {
      // Call the Weather API
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: location,
          days: maxForecastDays,
          aqi: 'no',
          alerts: 'yes',
        },
      });
  
      const forecastDays = response.data.forecast.forecastday;
  
      // Filter the hourly data based on the provided date range
      const filteredData = forecastDays.flatMap((day) =>
        day.hour.filter((hourData) => {
          const hourTime = parseDateTime(hourData.time);
          return hourTime >= new Date(startDate) && hourTime <= new Date(endDate);
        })
      );
  
      if (filteredData.length > 0) {
        return res.json({
          success: true,
          data: filteredData,
        });
      } else {
        return res.json({
          success: false,
          message: 'No weather data available for the given date range.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return res.json({
          success: false,
          message: 'Bad request. Please check the location or other parameters.',
        });
      } else {
        return res.json({
          success: false,
          message: `Error fetching weather data: ${error.message}`,
        });
      }
    }
}

module.exports = getFilteredWeatherData ;
