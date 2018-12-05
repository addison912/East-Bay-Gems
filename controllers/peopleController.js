const db = require('../models')

module.exports = {
//get all people
  index:  (req, res) =>{
    db.People.find().exec(function(err, people){
      if (err){
        console.log(err);
      } else {
        res.json(people)
      };
    });
  },
  create: (req, res) => {
    var newPlace = new db.Places({
      name: req.body.name,
      description: req.body.description,
      city: req.body.city,
      photo: req.body.photo,
      url: req.body.url,
      isAlive: req.body.isAlive,
      isFeatured: req.body.isFeatured,
      gem: req.body.gem
    });
    console.log(req.body.city);
    newPlace.save(function(err, place) {
      if (err) {
        console.log("create error: " + err);
      }
      console.log("created ", place.name);
    });
  }
}