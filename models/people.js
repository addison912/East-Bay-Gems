var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
  
});

var People = mongoose.model('People', PeopleSchema);
module.exports = People;