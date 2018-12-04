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
app.get("/api/places/featured", (req, res) => {
  db.Places.find().exec(function(err, places) {
    var featPlaces =[];
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
      places.forEach(featPlace => {
        if(featPlace.isFeatured){
          featPlaces.push(featPlace)
        } 
        
      });
      console.log(featPlaces);
      res.json(featPlaces) 
      
      
    
  });
});

app.post('/api/places', (req, res)=>{
  var newPlace = new db.Places({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    city: req.body.city,
    url: req.body.url,
    photo: req.body.photo
  });
  console.log(req.body.city);
  newPlace.save(function(err, place){
    if (err) {
      console.log("create error: " + err);
    }
    console.log("created ", place.name);
  });
})




//run server
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`east-bay-gems app listening at port ${port}`);
});
