const express = require('express');
const app = express();
const path = require("path");
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB = require("./server/models");
const User = require('./server/models').User;
const Attendant = require('./server/models').Attendant;
const Event = require('./server/models').Event;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

io.set('origins', '*:*');
io.set('match origin protocol', true);

const corsOptions = {
  origin: '*',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// Get an attendant
app.get("/api/attendants/:id", function(req, res){
  Attendant.findById(req.params.id, {include: { model: Event, as: 'events' } }).then(function(attendant){
      console.log('attending to events', attendant)
      res.json(attendant);
    // });
  });
});

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

// Edit an attendant
app.put("/api/attendants/:id", function(req, res){
  Attendant.findById(req.params.id).then(function(attendant){
    attendant.update(req.body)
    res.send(attendant)
  })
})

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
    user.getEvents({ include: { model: Attendant } }).then(function(events){
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
        user.getEvents({ include: { model: Attendant } }).then(function(events){
          res.json(events)
        })
      })
    })
  });
});

// Delete an event
app.delete('/api/events/:id', function(req, res){
  Event.findById(req.params.id).then(function(event){
    event.destroy()
    res.json(event)
  })
})

///////////
//SOCKETS//
///////////

io.on('connection', function(socket){

  // fires when room is hit
  socket.on('room', function(data) {
    console.log("DATA", data)
    socket.join(data.room);
  });

  // fires when text is entered
  socket.on('text', function(data) {
    console.log("DATA", data)
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
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

module.exports = app;
