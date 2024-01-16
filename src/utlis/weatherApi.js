module.exports = (config, httpRequests, cash) => ({

    async getCurrentWeatherByLocation(location) {
        const weatherDataFromCash = cash.getFromCash(location);
        if (weatherDataFromCash) {
            return weatherDataFromCash;
        }
        const apiKey = 'ab3d420f8dc248bb888232439241401';
        const urlString = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}&aqi=no`;
        const { error, data } = await httpRequests.get(urlString);

        if (error) {
            throw new Error(`ERROR WHILE COONTECT TO WEATHER API SERVER ${error}`);
        }

        cash.addToCash(location, data);

        return data;
    },
});
