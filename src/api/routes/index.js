const express = require('express');

const WeatherRoute = require('./weather.route');

module.exports = ({ controllers }) => {
    const router = express.Router();

    const { weatherController } = controllers;
    const weatherRoute = WeatherRoute(weatherController);

    router.use('/weather', weatherRoute);

    return router;
};
