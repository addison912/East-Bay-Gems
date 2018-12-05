const db = require("../models");

module.exports = {
  //get all places
  index: (req, res) => {
    db.Places.find().exec(function(err, places) {
      if (err) {
        console.log("index error: " + err);
        res.sendStatus(500);
      } else {
        res.json(places);
      }
    });
  },
  // get one place
  show: (req, res) => {
    // find one place by its id
    db.Places.findOne({ _id: req.params.id }, (err, foundPlace) => {
      if (err) {
        return console.log(err);
      }
      res.json(foundPlace);
    });
  },
  //get featured places
  indexFeat: (req, res) => {
    db.Places.find().exec(function(err, places) {
      let featured = [];
      if (err) {
        res.sendStatus(500);
        return console.log("index error: " + err);
      }
      places.forEach(featPlace => {
        if (featPlace.isFeatured) {
          console.log(featPlace);
          featured.push(featPlace);
        }
      });
      res.json(featured);
    });
  },

  //create a place
  create: (req, res) => {
    var newPlace = new db.Places({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      city: req.body.city,
      url: req.body.url,
      photo: req.body.photo,
      gem: req.body.gem
    });
    console.log(req.body.city);
    newPlace.save(function(err, place) {
      if (err) {
        console.log("create error: " + err);
      }
      console.log("created ", place.name);
    });
  },

  //delete a place
  delete: (req, res) => {
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
  },
  //update a place
  update: (req, res) => {
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
  }
};
