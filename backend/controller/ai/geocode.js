const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.GEOCODE_API_KEY ; 

function getCoordinate(loc) {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(loc)}&api_key=${apiKey}`;
    
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching geocode:', error);
            throw error; // Rethrow the error for further handling
        });
}

function getPlaceName(lat, lon) {
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${apiKey}`;
    
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching place name:', error);
            throw error; // Rethrow the error for further handling
        });
}


module.exports = {
    getCoordinate,
    getPlaceName
};

