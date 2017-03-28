const http = require('http');
const app = require('./app');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
const models = require('./server/models')

models.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function onError(error) { console.log('server error') }
function onListening() { console.log('you are now listening on', port) }
