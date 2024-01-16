module.exports = ({ weatherApi }) => ({
    getCurrentWeatherByLocation: async (locationPoint) => {
        const weatherData = await weatherApi.getCurrentWeatherByLocation(locationPoint);
        return weatherData;
    },
});
