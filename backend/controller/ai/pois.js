const axios = require('axios');

const API_KEY = '5b3ce3597851110001cf6248a7a4b7527c7c49318d6eb7210168034b';


/*
https://github.com/GIScience/openpoiservice/blob/main/openpoiservice/server/categories/categories.yml
 */

async function getPois(coordinates, filters = null) {
    // ORS API URL for Points of Interest (POI)
    const url = 'https://api.openrouteservice.org/pois';

    // Define the headers
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': API_KEY // Add your actual API key here
    };

    // Define the data payload (in JSON format)
    const data = {
        request: "pois",
        geometry: {
            geojson: {
                type: "Point",
                coordinates: coordinates // Use the provided coordinates
            },
            buffer: 200 // Buffer distance in meters
        }
    };

    // Add filters if provided
    if (filters) {
        data.filters = filters;
    }

    try {
        // Send the POST request
        const response = await axios.post(url, data, { headers });
        console.log("status: " + response.status);
        return response.data; // Return the returned JSON data
    } catch (error) {
        return `Error: ${error.response.status} - ${error.response.data}`;
    }
}


/*
// Example usage
const locationCoordinates = [90.4125, 23.8103];
const filters = {
  category_ids: [192, 180]
};

getPois(locationCoordinates, filters)
    .then(poisData => console.log(JSON.stringify(poisData, null, 4)))
    .catch(err => console.error(err));
*/

module.exports = {
  getPois
};

