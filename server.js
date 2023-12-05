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

app.listen(3001, () => {
  console.log('The server is ALIVE');
});

// middleware



// routes

app.get('/', (request, response) => {
  response.send('Hello from the other side');
});

app.get('/weather', (request, response) => {
  response.json(weatherData);
});

app.get('/weatherRequest', (request, response) => {
  const searchQuery = request.query.searchQuery;
  const lat = request.query.lat;
  const lon = request.query.lon;
});

// error handling
