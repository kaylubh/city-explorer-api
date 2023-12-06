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

  const cityData = weatherData.find(forecast =>
    forecast.city_name === searchQuery ||
    forecast.lat === lat ||
    forecast.lon === lon
  );

  const cityForecasts = cityData.data.map( (forecast) => new Forecast(forecast.datetime, forecast.weather.description));

  response.status(200).send(cityForecasts);
});

// error handling
