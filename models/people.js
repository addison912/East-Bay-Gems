var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  name: String,
  description: String,
  city: String,
  photo: String,
  url: String,
  isAlive: String
});

var People = mongoose.model("People", PeopleSchema);
module.exports = People;
