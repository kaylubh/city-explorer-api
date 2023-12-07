// import env vars
require('dotenv').config();
// dependencies
const cors = require('cors');
const axios = require('axios');
// express
const express = require('express');
const app = express();
// API KEYS
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
// port
const PORT = process.env.PORT || 3001;
// modules
const getCurrentWeather = require('./lib/weatherAPI');

// middleware
app.use(cors());

// routes
app.get('/', (request, response) => {
  response.send('Hello from the other side');
});
app.get('/weather', getCurrentWeather);
app.get('/movies', getMovies);
app.get('*', notFound);

// helper functions


async function getMovies(request, response) {
  const cityName = request.query.cityName;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}&include_adult=false&page=1`;

  try {
    const movieResponse = await axios.get(url);
    const movies = movieResponse.data.results.map((result) => new Movie(result));
    response.status(200).send(movies);
  } catch (error) {
    next(error);
  }
}

// classes


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
  response.status(500).send('Unable to process this request');
}

// start
app.listen(PORT, () => {
  console.log('The server is ALIVE');
});
