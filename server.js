'use strict';

// dependencies
require('dotenv').config();
const cors = require('cors');
// express
const express = require('express');
const app = express();
// data
const weatherData = require('./data/weather.json');

// port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('The server is ALIVE');
});

// middleware

app.use(cors());

class Forecast {

  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

// routes

app.get('/', (request, response) => {
  response.send('Hello from the other side');
});

app.get('/weather', (request, response) => {
  const searchQuery = request.query.searchQuery;
  const lat = request.query.lat;
  const lon = request.query.lon;

  try {
    const cityData = weatherData.find(forecastData =>
      forecastData.city_name === searchQuery ||
      forecastData.lat === lat ||
      forecastData.lon === lon
    );

    const cityForecasts = cityData.data.map((forecast) => new Forecast(forecast.datetime, forecast.weather.description));

    response.status(200).send(cityForecasts);
  } catch (error) {
    next(error);
  }
});

app.get('*', notFound);

// error handling

function notFound(request, response) {
  response.status(404).send('Nothing to See Here');
}

function errorHandler(error, request, response, next) {
  response.send(500).send('Unable to process this request');
}
