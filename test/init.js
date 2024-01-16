const config = require('../src/config/config');

const depndeices = require('../src/api/init')(config);

const {
    controllers,
    services,
    httpRequests,
    weatherApiCash,
    weatherApi,
} = depndeices;

module.exports = {

    weatherController: controllers.weatherController,
    weatherService: services.weatherService,
    httpRequests,
    weatherApiCash,
    weatherApi,

};
