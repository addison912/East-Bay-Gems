var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CitiesSchema = new Schema({
  city: String,
  people: [
    {
      type: Schema.Types.ObjectId,
      ref: "People"
    }
  ],
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: "Places"
    }
  ]
});

var Cities = mongoose.model("Cities", CitiesSchema);
module.exports = Cities;
