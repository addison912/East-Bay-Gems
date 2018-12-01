const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/East-Bay-Gems"
);

module.exports.Places = require("./places.js");
module.exports.People = require("./people.js");
module.exports.Cities = require("./cities.js");
