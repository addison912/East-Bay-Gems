[![alt text](https://i.imgur.com/sWEKDcW.png)](https://nodesource.com/products/nsolid)
 
## East-Bay-Gems
​
This is a webpage that is desgined to help users find and share interesting lesser-known people and places in the east bay.  People can create a user through Google, sign-in, post and like gems in their area.  The homwpage shows a random selection of featured gems.  On the main page we randomly populate with gems from all over the east bay.  On the right, you can filter based on gem-type.  And soon, by location, or type of venue. 
​
## Getting Started
​
It's a webpage.  Go to https://east-bay-gems.herokuapp.com, login and submit a gem!
​
### Prerequisites
​
A computer with internet access.


Fingers, or some other means of navigating the web. 
​
```
Examples: Pointer finger, thumb etc...
```
​
### Usage
​
Login to your account
​
Click your photo in the top right corner
​
Example:


![alt text](https://lh4.googleusercontent.com/-wZbE0FQJVOU/AAAAAAAAAAI/AAAAAAAAAyA/nQg_iGhYm1g/s96-c/photo.jpg)

​
Select what type of gem you would like to submit.

```
Person/Place
```

Fill out all required fields. 

Press submit!
​
## Deployment
​
We have deployed on Heroku
​
## Code 
 ```
  ///////////////search filter function//////////
  $("#search").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#gems .card").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
```
```
///////////////shuffle function/////////////
let shuffle = array => {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};
```

## Built With
​
- [Materialize](https://materializecss.com/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - Database Software
- [Heroku](https://www.heroku.com) - Web Hosting
​
## Contributing
​
[Fisher-Yates Shuffle](https://bost.ocks.org/mike/shuffle/) - 3rd party code used to shuffle front page


[Search Function](https://www.w3schools.com/howto/howto_js_filter_lists.asp) - Help from Jquery Docs
​

## Authors
​
- **Addison Moore** - _Initial work_ - [Github](https://github.com/addison912)
- **Langdon Froker** - _Initial work_ - [Github](https://github.com/langdonf) 

## License
​
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
​
​
## Special Thanks
 Help from-- 
- **Dalton Hart** 
- **Isha Arora**
   
​
## Acknowledgments
- Google
- Stack Overflow

