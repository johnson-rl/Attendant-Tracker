const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB = require("./server/models");
const User = require('./server/models').User;
const Attendant = require('./server/models').Attendant;
const Event = require('./server/models').Event;
const app = express();

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
  Attendant.findById(req.params.id, { include: [ events ] } ).then(function(attendant){
    res.json(attendant);
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
        user.getEvents({ include: [ Attendant ] }).then(function(events){
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

/////////////////
//Documentation//
/////////////////

app.get('*', (req, res) => res.status(200).send({
  message: 'This is the Attendant Tracker API!  Welcome!',
}));

module.exports = app;
