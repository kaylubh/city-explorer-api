// import env vars
require('dotenv').config();
// dependencies
const axios = require('axios');
// API KEY
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

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

class Movie {
  constructor(obj) {
    this.title = obj.title;
    this.description = obj.overview;
    this.imageSrc = `https://image.tmdb.org/t/p/w92${obj.poster_path}`;
    this.id = obj.id;
  }
}

module.exports = getMovies;
