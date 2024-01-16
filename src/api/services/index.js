const WeatherService = require('./weather.service');

module.exports = ({ weatherApi }) => (
    { weatherService: WeatherService({ weatherApi }) }
);
