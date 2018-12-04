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
app.get("/about.html", function(req, res) {
  res.sendFile("views/about.html", { root: __dirname });
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

//get all places
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

// get featured places
app.get("/api/places/featured", (req, res) => {
  db.Places.find().exec(function(err, places) {
    let featured = [];
    if (err) {
      res.sendStatus(500);
      return console.log("index error: " + err);
    }
    places.forEach(featPlace => {
      if (featPlace.isFeatured == true) {
        console.log(featPlace);
        featured.push(featPlace);
      }
    });
    res.json(featured);
  });
});

// get one place
app.get("/api/places/:id", function(req, res) {
  // find one place by its id
  db.Places.findOne({ _id: req.params.id }, (err, foundPlace) => {
    if (err) {
      return console.log(err);
    }
    res.json(foundPlace);
  });
});

//create a place
app.post("/api/places", (req, res) => {
  var newPlace = new db.Places({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    city: req.body.city,
    url: req.body.url,
    photo: req.body.photo
  });
  console.log(req.body.city);
  newPlace.save(function(err, place) {
    if (err) {
      console.log("create error: " + err);
    }
    console.log("created ", place.name);
  });
});

// delete a place
app.delete("/api/places/:id", function(req, res) {
  // get place id from url params (`req.params`)
  console.log("places", req.params);
  var placeId = req.params.id;
  // find the index of the place we want to remove
  db.Places.findByIdAndDelete(placeId, (err, deletedPlace) => {
    if (err) {
      return console.log(err);
    }
    res.json(deletedPlace);
  });
  console.log("deleting place with id", placeId);
});

// update place
app.put("/api/places/:id", function(req, res) {
  // get place id from url params (`req.params`)
  var placeId = req.params.id;
  // find the index of the place we want to update
  db.Places.findByIdAndUpdate(
    placeId,
    req.body,
    { new: true },
    (err, updatedPlace) => {
      if (err) {
        return console.log(err);
      }
      res.json(updatedPlace);
    }
  );
});

//run server
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`east-bay-gems app listening at port ${port}`);
});
