var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  uid: String,
  imageUrl: String,
  fullName: String,
  email: String,
  posts: [],
  likes: []
});

var Users = mongoose.model("User", userSchema);
module.exports = Users;
