const db = require('../models')

module.exports = {
//get all people
  index:  (req, res) =>{
    db.People.find().exec(function(err, people){
      if (err){
        console.log(err);
      } else {
        res.json(people)
      };
    });
  }
}