const HTTP_CODES = require('../../../enums/HTTP_CODES');

const getListingResponse = (data, { page, limit }) => ({
    statusCode: HTTP_CODES.OK,
    data: { data, hasNextPage: (data.length >= limit), page, limit, count: data.length },
});

const getResponse = (data) => ({
    statusCode: HTTP_CODES.OK,
    data: { data },
});

module.exports = {
    getResponse,
    getListingResponse,
};
