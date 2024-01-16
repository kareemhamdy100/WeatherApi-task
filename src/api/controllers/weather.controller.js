const { locationSchema } = require('../schemas/sharedScemas');
const validate = require('../schemas/validateFunction');
const { getResponse } = require('./utlis/httpResponseFunction');

module.exports = (weatherService) => ({

    getCurrentWeatherByLocation: async ({ queryParams }) => {
        const locationPoint = await validate(queryParams, locationSchema);

        const weatherData = await weatherService.getCurrentWeatherByLocation(locationPoint);

        return getResponse(weatherData);
    },
});
