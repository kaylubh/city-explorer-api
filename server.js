// import env vars
require('dotenv').config();
// dependencies
const cors = require('cors');
// express
const express = require('express');
const app = express();
// port
const PORT = process.env.PORT || 3001;
// modules
const getCurrentWeather = require('./lib/weatherAPI');
const getMovies = require('./lib/moviesAPI');

// middleware
app.use(cors());

// routes
app.get('/', (request, response) => {
  response.send('Hello from the other side');
});
app.get('/weather', getCurrentWeather);
app.get('/movies', getMovies);
app.get('*', notFound);

// error handling
function notFound(request, response) {
  response.status(404).send('Nothing to See Here');
}

function errorHandler(error, request, response, next) { //eslint-disable-line
  response.status(500).send('Unable to process this request');
}

// start
app.listen(PORT, () => {
  console.log('The server is ALIVE');
});
