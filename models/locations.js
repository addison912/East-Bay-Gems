var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationsSchema = new Schema({

});

var Locations = mongoose.model('Locations', LocationsSchema);
module.exports = Locations;