/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

const express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  ctrl = require("./controllers");

// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static("public"));
app.use(express.json());

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//  HTML ENDPOINTS
///////////////////

// define a root route: localhost:3000/
app.get("/", function(req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});
app.get("/home.html", function(req, res) {
  res.sendFile("views/home.html", { root: __dirname });
});
app.get("/about.html", function(req, res) {
  res.sendFile("views/about.html", { root: __dirname });
});
app.get("/profile.html", function(req, res) {
  res.sendFile("views/profile.html", { root: __dirname });
});

//////////// People ////////////

//get all people
app.get("/api/people", ctrl.People.index);

//////////// Places ////////////

//get all places
app.get("/api/places", ctrl.Places.index);

// get featured places
app.get("/api/places/featured", ctrl.Places.indexFeat);

// get one place
app.get("/api/places/:id", ctrl.Places.show);

//create a place
app.post("/api/places", ctrl.Places.create);

// delete a place
app.delete("/api/places/:id", ctrl.Places.delete);

// update place
app.put("/api/places/:id", ctrl.Places.update);

//////////// Users ////////////

// get user by uid
app.get("/api/users/:uid", ctrl.Users.getByUid);

//create a new user
app.post("/api/users", ctrl.Users.createUser);

//run server
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`east-bay-gems app listening at port ${port}`);
});
