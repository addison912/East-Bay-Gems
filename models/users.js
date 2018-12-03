var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  imageUrl: String,
  firstName: String,
  lastName: String,
  email: String,
  posts: []
});

var Users = mongoose.model("User", userSchema);
module.exports = Users;
