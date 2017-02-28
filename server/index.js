'use strict';

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const DB = require("./db/connection");
const User = DB.models.User;
const Attendant = DB.models.Attendant;
const Event = DB.models.Event;


var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: '*',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions));
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


//////////////////////////////
//////******ROUTES******//////
//////////////////////////////

///////////////
//USER ROUTES//
///////////////

// Get all users
app.get("/api/users", function(req, res){
  User.findAll().then(function(user){
    res.json(user);
  });
});

// Create a user
app.post("/api/users", function(req, res){
  User.create(req.body).then(function(user){
    res.json(user)
  });
});

// Get one user
app.get("/api/users/:id", function(req, res){
  User.findById(req.params.id).then(function(user){
    res.json(user)
  });
});

////////////////////
//ATTENDANT ROUTES//
////////////////////

// Get all attendants
app.get("/api/attendants", function(req, res){
  Attendant.findAll().then(function(attendant){
    res.json(attendant);
  });
});

// Get all attendants for one user
app.get("/api/users/:id/attendants", function(req, res){
  User.findById(req.params.id).then(function(user){
    user.getAttendants().then(function(attendants){
      res.json(attendants)
    })
  });
});

// Save an attendant
app.post("/api/users/:id/attendants", function(req, res){
  Attendant.create(req.body).then(function(attendant){
    User.findById(req.params.id).then(function(user){
      user.addAttendant(attendant);
      res.json(attendant)
    })
  });
});

// Delete an attendant
app.delete("/api/attendants/:id", function(req, res){
  Attendant.findById(req.params.id).then(function(attendant){
    attendant.destroy()
    res.send(attendant)
  })
})

////////////////
//EVENT ROUTES//
////////////////

// Get all of a User's events
app.get("/api/users/:id/events", function(req, res){
  User.findById(req.params.id).then(function(user){
    console.log(user)
    user.getEvents({ include: [ Attendant ] }).then(function(events){
      res.json(events)
    })
  });
});

// Create an event
app.post("/api/users/:user_id/attendants/:attendant_id/events", function(req, res){
  Attendant.findById(req.params.attendant_id).then(function(attendant){
    User.findById(req.params.user_id).then(function(user){
      Event.create(req.body).then(function(event){
        user.addEvent(event)
        attendant.addEvent(event)
        res.json(event)

      })
    })
  });
});

///////////////
//CLIENT-SIDE//
///////////////

// Redirects all other routes for client side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

///////////
//SOCKETS//
///////////

// Fires when socket connection made
io.on('connection', function(socket){

  // console.log("you're on sockets")

  // fires when room is hit
  socket.on('room', function(data) {
    // console.log("you've reached room", data.room)
    socket.join(data.room);
  });

  // first when text is entered
  socket.on('text', function(data) {
    socket.broadcast.to(data.room).emit('receive text',
      data)
      // console.log('some dude wrote', data.text)
  })
});

server.listen(process.env.PORT || 9000);
