const WeatherController = require('./weather.controller');

module.exports = ({ services }) => {
    const { weatherService } = services;

    return { weatherController: WeatherController(weatherService) };
};
