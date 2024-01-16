const axios = require('axios');

module.exports = () => ({
    get: async (url) => {
        try {
            const response = await axios.get(url);

            return { error: null, data: response.data };
        } catch (error) {
            return { error, data: null };
        }
    },
});
