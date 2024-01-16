# Weather API Endpoint Implementation

This project involves the implementation of a single endpoint to retrieve the current weather based on location. The technologies used include Node.js, Express, and Jest for testing. The endpoint takes latitude and longitude as query parameters from the client-side, and the server calls a third-party weather API (https://www.weatherapi.com/) to fetch the weather data.

## How to Run the Project

1. **Clone the repository**

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Run the project:**

    ```
    npm run start
    ```

4. **Run tests:**

    ```
    npm run test
    ```

You can test the application by making a request to the following endpoint from your browser:


```
http://localhost:5000/api/weather/currentWeather?latitude=30&longitude=50
```


## Caching Mechanism

Cash Module named `weatherApiCash` has been implemented. This simple cache uses an array with a maximum size of 1000 elements. The functionality includes:

- **Adding to Cache:** If the array size is greater than or equal to 1000, items will be removed from the cache based on the time saved, up to 10 minutes.

- **Getting from Cache:** The cache retrieval depends on the location. If the location is within a radius of 10 km and the time is within 10 minutes, the cache hit occurs; otherwise, it's a cache miss.

To enhance this cache, consideration could be given to using an external in-memory database and employing more efficient data structures.
