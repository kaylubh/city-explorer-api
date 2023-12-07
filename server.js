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
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
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
app.get('/movies', getMovies);
app.get('*', notFound);

// helper functions
async function getCurrentWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;

  const url = `https://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  try {
    const weatherResponse = await axios.get(url);
    const currentWeather = weatherResponse.data.data.map((element) => new Weather(element));
    response.status(200).send(currentWeather);
  } catch (error) {
    next(error);
  }
}

async function getMovies(request, response) {
  const cityName = request.query.cityName;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}&include_adult=false&page=1`;

  try {
    const movieResponse = await axios.get(url);
    const movies = movieResponse.data.results.map((result) => new Movie(result));
    response.status(200).send(movies);
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

class Movie {
  constructor(obj) {
    this.title = obj.title;
    this.description = obj.overview;
    this.imageSrc = `https://image.tmdb.org/t/p/w92${obj.poster_path}`;
    this.id = obj.id;
  }
}

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
