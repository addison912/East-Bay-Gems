const db = require("../models");

module.exports = {
  //get all people
  index: (req, res) => {
    db.People.find().exec(function(err, people) {
      if (err) {
        console.log(err);
      } else {
        res.json(people);
      }
    });
  },
  create: (req, res) => {
    var newPerson = new db.People({
      name: req.body.name,
      description: req.body.description,
      city: req.body.city,
      photo: req.body.photo,
      url: req.body.url,
      isAlive: req.body.isAlive,
      isFeatured: req.body.isFeatured,
      gem: req.body.gem
    });

    newPerson.save(function(err, person) {
      if (err) {
        console.log("create error: " + err);
      }
      console.log("created ", person.name);
      res.json(person);
    });
  }
};
