const {
    weatherController,
    weatherService,
    httpRequests,
    weatherApiCash,
    weatherApi,
} = require('./init');

describe('test getCurrentWeatherController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should throw error if send missing logitude', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: '10' } }))
            .rejects.toThrow('"longitude" is required');
    });

    it('should throw error if send missing latudie', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: {} }))
            .rejects.toThrow('"latitude" is required');
    });

    it('should throw error if send latudie not number', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: 'invalid' } }))
            .rejects.toThrow('"latitude" must be a number');
    });

    it('should throw error if send longitude not number', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: '15', longitude: 'invalid' } }))
            .rejects.toThrow('"longitude" must be a number');
    });

    it('should throw error if send latudie should greater than 90', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: '200' } }))
            .rejects.toThrow('"latitude" must be less than or equal to 90');
    });

    it('should throw error if send longitude should greater than 180', async () => {
        await expect(weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: '90', longitude: '200' } }))
            .rejects.toThrow('"longitude" must be less than or equal to 180');
    });

    it('should call weatherService.getCurrentWeather and return data with valid response shape', async () => {
        jest.spyOn(weatherService, 'getCurrentWeatherByLocation');
        weatherService.getCurrentWeatherByLocation.mockImplementationOnce(() => ({
            temp: '50c',
            weather: 'sunny ',
        }));

        const response = await weatherController.getCurrentWeatherByLocation({ queryParams: { latitude: '20', longitude: '50' } });

        expect(response).toEqual(
            { statusCode: 200, data: { data: { temp: '50c', weather: 'sunny ' } } },
        );
    });
});

describe('test weatherService.getCurrentWeather', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call weatherApi.getCurrentWeather and return data with valid response', async () => {
        jest.spyOn(weatherApi, 'getCurrentWeatherByLocation');
        weatherApi.getCurrentWeatherByLocation.mockImplementationOnce(() => ({
            temp: '50c',
            weather: 'sunny ',
        }));

        const response = await weatherService.getCurrentWeatherByLocation({ latitude: '20', longitude: '50' });

        expect(response).toEqual(
            { temp: '50c', weather: 'sunny ' },
        );
    });
});

describe('test weatherApi.getCurrentWeather', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call getFromCash and httpRequest.Get return data with valid response', async () => {
        jest.spyOn(weatherApiCash, 'addToCash');
        weatherApiCash.addToCash.mockImplementationOnce(() => undefined);
        jest.spyOn(weatherApiCash, 'getFromCash');
        weatherApiCash.getFromCash.mockImplementationOnce(() => null);
        jest.spyOn(httpRequests, 'get');
        httpRequests.get.mockImplementationOnce(() => ({
            data: {
                temp: '50c',
                weather: 'sunny ',
            },
        }));

        const response = await weatherApi.getCurrentWeatherByLocation({ latitude: '20', longitude: '50' });

        expect(weatherApiCash.addToCash).toBeCalled();
        expect(response).toEqual(
            { temp: '50c', weather: 'sunny ' },
        );
    });

    it('should call getFromCash and not httpRequest.Get return data from Cash', async () => {
        jest.spyOn(weatherApiCash, 'addToCash');
        jest.spyOn(weatherApiCash, 'getFromCash');
        weatherApiCash.getFromCash.mockImplementationOnce(() => ({
            temp: '60c',
            weather: 'sunny from Cash',
        }));
        jest.spyOn(httpRequests, 'get');
        httpRequests.get.mockImplementationOnce(() => ({
            data: {
                temp: '50c',
                weather: 'sunny ',
            },
        }));

        const response = await weatherApi.getCurrentWeatherByLocation({ latitude: '20', longitude: '50' });

        expect(weatherApiCash.addToCash).not.toBeCalled();
        expect(httpRequests.get).not.toBeCalled();
        expect(response).toEqual(
            { temp: '60c', weather: 'sunny from Cash' },
        );
    });
});
