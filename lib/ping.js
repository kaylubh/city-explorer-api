function ping(request, response) {
  response.status(200).send('ready');
}

module.exports = ping;
