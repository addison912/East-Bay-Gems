let user;
let gems = [];

$(document).ready(function() {
  if (JSON.parse(sessionStorage.getItem("loggedIn"))) {
    user = JSON.parse(sessionStorage.getItem("currentUser"));
  }
  addProfileInfo();
  getAll();
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
    gems = allPeople.concat(allPlaces);
    gems = shuffle(gems);
    addPosts();
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

function addProfileInfo() {
  $("#userImg").attr("src", `${user.imageUrl}`);
  $("#userName").text(user.fullName);
}

function addPosts() {
  user.posts.forEach(post => {
    for (let i = 0; i < gems.length; i++) {
      if (post == gems[i]._id) {
        gem = gems[i];
        cardHtml = `<div attr="${gem.city}" class="${
          gem.gem
        } card small horizontal hoverable" id=${gem._id}>
                      <div class="card-image waves-effect waves-block waves-light">
                      </div>
                      <div class="card-stacked">
                        <div class="card-content">
                          <span class="card-title activator grey-text text-darken-4"><i class="far fa-gem fa-1x top"></i> ${
                            gem.name
                          } - ${gem.city}</span>
                          <p>${gem.description}</p>
                        </div>
                        <div class="card-action">
                          <a href="${gem.url}">More info</a>
                        </div>
                      </div>
                      <div class="card-reveal col l4">
                          <span class="card-title grey-text text-darken-4">Lat=, Lon=<i class="material-icons right">close</i></span>
                          <p>Info</p>
                        </div>
                    </div>`;
        $("#userPosts").append(cardHtml);
        document
          .getElementById(`${gem._id}`)
          .querySelector(".card-image").style.backgroundImage = `url("${
          gem.photo
        }")`;
      }
    }
  });
}
