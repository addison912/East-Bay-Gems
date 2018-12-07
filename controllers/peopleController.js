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
  },

  //delete a person
  delete: (req, res) => {
    // get people id from url params (`req.params`)
    console.log("people", req.params);
    var peopleId = req.params.id;
    // find the index of the people we want to remove
    db.People.findByIdAndDelete(peopleId, (err, deletedPeople) => {
      if (err) {
        return console.log(err);
      }
      res.json(deletedPeople);
    });
    console.log("deleting person with id", peopleId);
  },
  //update a person
  update: (req, res) => {
    // get people id from url params (`req.params`)
    var peopleId = req.params.id;
    // find the index of the people we want to update
    db.People.findByIdAndUpdate(
      peopleId,
      req.body,
      { new: true },
      (err, updatedPeople) => {
        if (err) {
          return console.log(err);
        }
        res.json(updatedPeople);
      }
    );
  }
};
