const HTTP_CODES = require('../../enums/HTTP_CODES');

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
    let statusCode = error.status || 500;

    let errorMessage = error.message;
    if (error.message === 'Validation error') {
        statusCode = HTTP_CODES.BAD_REQUEST;
        errorMessage = error.errors[0].message;
    }

    res.status(statusCode).json({ error: errorMessage.replace(/["]+/g, '') });
};
