const Services = require('./services');
const Controllers = require('./controllers');
const Routes = require('./routes');
const HttpRequests = require('../utlis/httpRequests');
const WeatherApi = require('../utlis/weatherApi');
const WeatherApiCash = require('../utlis/weatherCash');

module.exports = (config) => {
    const httpRequests = HttpRequests(config);
    const weatherApiCash = WeatherApiCash();
    const weatherApi = WeatherApi(config, httpRequests, weatherApiCash);

    const services = Services({ weatherApi });
    const controllers = Controllers({ services });
    const routers = Routes({ controllers });

    return {
        httpRequests,
        weatherApiCash,
        weatherApi,

        services,
        controllers,
        routers,
    };
};
