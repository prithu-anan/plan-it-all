const axios = require('axios');
require('dotenv').config();

api_key = process.env.DIRECTION_API_KEY ;

async function getDirections(src, way, dst) {
    const body = {
        "coordinates": [src, ...way, dst]
    };

    const headers = {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': api_key,
        'Content-Type': 'application/json; charset=utf-8'
    };

    try {
        const response = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car/geojson', body, { headers });
        return response.data; // No need to parse, Axios handles it automatically
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to propagate it to the caller
    }
}

module.exports = {
    getDirections
};
