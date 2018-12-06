let user;

$(document).ready(function() {
  if (JSON.parse(sessionStorage.getItem("loggedIn"))) {
    console.log("here");
    user = JSON.parse(sessionStorage.getItem("currentUser"));
  }
  getAll();
  user.posts.forEach(post => {
    console.log(post);
  });
});

function getAll() {
  let allPeople;
  let allPlaces;
  $.ajax({
    method: "GET",
    url: "/api/places",
    success: placeSuccess,
    error: placeError
  });
  function placeSuccess(places) {
    allPlaces = places;
    $.ajax({
      method: "GET",
      url: "/api/people",
      success: peopleSuccess,
      error: peopleError
    });
  }
  function peopleSuccess(people) {
    allPeople = people;
    let gems = allPeople.concat(allPlaces);
    gems = shuffle(gems);
    console.log(gems);
  }
  function placeError() {
    console.log("error");
  }
  function peopleError() {
    console.log("error");
  }
}

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
