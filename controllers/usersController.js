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
  }
};
