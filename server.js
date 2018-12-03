/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

const express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models");

// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static("public"));
app.use(express.json());

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get("/", function(req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});
app.get("/home.html", function(req, res) {
  res.sendFile("views/home.html", { root: __dirname });
});
app.get("/api/cities", (req, res) => {
  db.Cities.find().exec(function(err, cities) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    } else {
      res.json(cities);
    }
  });
});
app.get("/api/places", (req, res) => {
  db.Places.find().exec(function(err, places) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    } else {
      res.json(places);
    }
  });
});

//run server
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`east-bay-gems app listening at port ${port}`);
});
