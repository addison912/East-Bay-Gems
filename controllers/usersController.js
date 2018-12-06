const db = require("../models");

module.exports = {
  // get user
  getByUid: (req, res) => {
    // find one user by uid
    db.Users.findOne({ uid: req.params.uid }, (err, foundUser) => {
      if (err) {
        return console.log(err);
      }
      res.json(foundUser);
    });
  },

  // create user
  createUser: (req, res) => {
    var newUser = new db.Users({
      username: req.body.username,
      uid: req.body.uid,
      email: req.body.email,
      fullName: req.body.fullName,
      imageUrl: req.body.imageUrl,
      likes: [],
      posts: []
    });
    newUser.save(function(err, newUser) {
      if (err) {
        return console.log("create error: " + err);
      }
      console.log("created ", newUser.fullName);
      res.json(newUser);
    });
  },
  //update user
  update: (req, res) => {
    // get user id from url params (`req.params`)
    var uid = req.params.uid;
    db.Users.findOneAndUpdate(
      {uid: uid},
      req.body,
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return console.log(err);
        }
        res.json(updatedUser);
      }
    );
  }
};
