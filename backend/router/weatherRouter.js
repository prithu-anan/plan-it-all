const express = require('express');

const router = express.Router();

const getFilteredWeatherData = require('../controller/weatherController');


router.route('/')
.post(getFilteredWeatherData) ;


module.exports = router;