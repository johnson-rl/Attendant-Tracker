// const Sequelize = require("sequelize");
//
// var sequelize = new Sequelize('postgres:///attendant-dev', {
//   host: 'localhost',
//   dialect: 'postgres',
//
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });
//
//
// var User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });
//
// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });


const http = require('http');
const app = require('./app');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
const models = require('./server/models')

const pg = require('pg');

// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

  models.sequelize.sync().then(function () {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  });

// });

function onError(error) { console.log('server error') }
function onListening() { console.log('you are now listening on', port) }
