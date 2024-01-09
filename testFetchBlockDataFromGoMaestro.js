const { fetchBlockDataFromGoMaestro } = require('./server'); // Update with the path to your server.js file

fetchBlockDataFromGoMaestro({ type: 'latestBlock' })
  .then(data => console.log('Test fetchBlockDataFromGoMaestro data:', data))
  .catch(error => console.error('Test fetchBlockDataFromGoMaestro error:', error));