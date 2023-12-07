'use strict';

// dependencies
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
// express
const express = require('express');
const app = express();
// API KEYS
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// port
const PORT = process.env.PORT || 3001;

// middleware

app.use(cors());

// routes

app.get('/', (request, response) => {
  response.send('Hello from the other side');
});

app.get('/weather', getCurrentWeather);

// app.get('/weather', (request, response) => {
//   const searchQuery = request.query.searchQuery;
//   const lat = request.query.lat;
//   const lon = request.query.lon;

//   try {
//     const cityData = weatherData.find(forecastData =>
//       forecastData.city_name === searchQuery ||
//       forecastData.lat === lat ||
//       forecastData.lon === lon
//     );

//     const cityForecasts = cityData.data.map((forecast) => new Forecast(forecast.datetime, forecast.weather.description));

//     response.status(200).send(cityForecasts);
//   } catch (error) {
//     next(error);
//   }
// });

app.get('*', notFound);

// helper functions

async function getCurrentWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;

  const url = `https://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  try {
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const currentWeather = weatherResponse.data.data.map((element) => new Weather(element));
    console.log(currentWeather);
    response.status(200).send(currentWeather);
  } catch (error) {
    // next(error);
  }
}

// classes

class Weather {
  constructor(obj) {
    this.description = obj.weather.description;
    this.temp = obj.temp;
    this.feelsTemp = obj.app_temp;
    this.humidity = obj.rh;
    this.windSpeed = obj.wind_spd;
    this.windGust = obj.gust;
    this.cloudCoverage = obj.clouds;
    this.rain = obj.precip;
  }
}

// class Forecast {

//   constructor(date, description) {
//     this.date = date;
//     this.description = description;
//   }
// }

// error handling

function notFound(request, response) {
  response.status(404).send('Nothing to See Here');
}

function errorHandler(error, request, response, next) {
  response.send(500).send('Unable to process this request');
}

// start

app.listen(PORT, () => {
  console.log('The server is ALIVE');
});
