'use strict';

// dependencies
require('dotenv').config();
const cors = require('cors');
// express
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log('The server is ALIVE');
});

// middleware



// routes

app.get('/', (request, response) => {
  response.send('Hello from the other side');
});

// error handling
