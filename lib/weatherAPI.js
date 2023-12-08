// import env vars
require('dotenv').config();
// dependencies
const axios = require('axios');
// API KEYS
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// cache module
const cache = require('./cache');

async function getCurrentWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const coordinates = `${lat}_${lon}`;

  const url = `https://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I`;

  if (cache[coordinates] === undefined) {

    try {
      const weatherResponse = await axios.get(url);
      const currentWeather = weatherResponse.data.data.map((element) => new Weather(element));
      cache[coordinates] = {content: currentWeather};
      response.status(200).send(currentWeather);
      console.log('Data from API');
    } catch (error) {
      next(error); //eslint-disable-line
    }

  } else {
    response.status(200).send(cache[coordinates].content);
    console.log('Data from cache');
  }

}



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

module.exports = getCurrentWeather;
