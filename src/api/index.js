const express = require('express');

const initDependices = require('./init');
const errorMiddleware = require('./middlewares/error.middleware');

module.exports = async (config) => {
    const dependices = await initDependices(config);
    const expressApp = express();
    expressApp.use(express.json());

    expressApp.use('/api', dependices.routers);

    expressApp.use(errorMiddleware);
    return expressApp;
};
