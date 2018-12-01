/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

const express = require("express"),
  bodyParser = require("body-parser");

// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static("public"));
app.use(express.json());

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get("/", function(req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});

//run server on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("personal api app listening at http://localhost:3000/");
});
