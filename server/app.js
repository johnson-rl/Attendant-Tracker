const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const DB = require("./db/connection");
const User = DB.models.User;
const Attendant = DB.models.Attendant;

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


// Redirects all other routes for client side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
