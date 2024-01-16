const express = require('express');

const router = express.Router();

const expressMiddleWare = require('../middlewares/request.middleware');

module.exports = (weatherController) => {
    router.get('/currentWeather', expressMiddleWare(weatherController.getCurrentWeatherByLocation));

    return router;
};
