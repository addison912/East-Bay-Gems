var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlacesSchema = new Schema({
  name: String,
  type: Array,
  description: String,
  city: String,
  photo: String,
  url: String,
  coordinates: { lat: Number, lng: Number },
  isFeatured: Boolean,
  gem: String,
  numOfLikes: Number
});

var Places = mongoose.model("Places", PlacesSchema);
module.exports = Places;
