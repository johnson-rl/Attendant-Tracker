'use strict';

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// const corsOptions = {
//   origin: '*',
//   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors(corsOptions));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//////////////////////////////
//////******ROUTES******//////
//////////////////////////////

///////////
//SOCKETS//
///////////

io.on('connection', function(socket){

  // fires when room is hit
  socket.on('room', function(data) {
    socket.join(data.room);
  });

  // fires when text is entered
  socket.on('text', function(data) {
    socket.broadcast.to(data.room).emit('receive text',
      data)
  })
});

/////////
///SMS///
/////////

// const accountSid = process.env.TWILIO_KEY;
// const authToken = process.env.TWILIO_TOKEN;
//
// const twilio = require('twilio');
// const client = new twilio.RestClient(accountSid, authToken);
//
// app.post('/api/sms', (req, res)=> {
//   client.messages.create({
//       body: req.body.message || 'hello from twilio',
//       to: process.env.RECIPIENT_NUMBER,
//       from: process.env.TWILIO_NUMBER
//   }, function(err, message) {
//       console.log(message.sid);
//   });
//   res.send('sent')
// })

///////////////
//CLIENT-SIDE//
///////////////

// Redirects all other routes for client side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

server.listen(process.env.PORT || 9000);
