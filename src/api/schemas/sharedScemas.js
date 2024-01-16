const Joi = require('joi');

const latitude = Joi.number().min(-90).max(90);

const longitude = Joi.number().min(-180).max(180);

const locationSchema = Joi.object({
    latitude: latitude.required(),
    longitude: longitude.required(),
}).required();
module.exports = { longitude, latitude, locationSchema };
