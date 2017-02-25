var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require('morgan');

var DB = require("./db/connection");
var User = DB.models.User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.post("/api/users", function(req, res){
  User.create(req.body).then(function(user){
    res.send(user)
  });
});

app.get("/api/users", function(req, res){
  User.findAll().then(function(user){
    res.json(user);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
