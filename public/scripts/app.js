var frontPage = []
var allPlaces;
var allPeople;


$(document).ready(function() {
  
  console.log("Sanity check");
  $(".modal").modal();
  $(".slider").slider({
    height: 800
  });
  $("select").formSelect();
  $("#places").on("click", function() {
  $("#places_menu").toggleClass("hide");
  });

$.ajax({
  method: "GET",
  url: "/api/places",
  success: placeSuccess,
  error: placeError
});



function placeSuccess(places){
  allPlaces = places;
  $.ajax({
    method: "GET",
    url: "/api/people",
    success: peopleSuccess,
    error: peopleError
  });
}
function peopleSuccess(people){
  allPeople = people;
  populate();
}

function placeError() {
  console.log("error");
}
function featError() {
  console.log("error");
}
function peopleError(){
  console.log("error");
}
$("#newPlaceForm").on("submit", function(e) {
  $.ajax({
    method: "POST",
    url: "/api/places",
    data: $(this).serialize(),
    success: newPlaceSuccess
  });

  function newPlaceSuccess(json) {
    console.log(json);
  }

});

});

let shuffle = (array) => {
  var m = array.length, t, i;

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
}



let populate = () =>{
  gems = allPeople.concat(allPlaces);
  let results = shuffle(gems);
  results.forEach(gem => {
    console.log(gem);
    cardHtml = `<div class="card small horizontal hoverable" id=${gem._id}>
                  <div class="card-image waves-effect waves-block waves-light">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4"><i class="far fa-gem fa-1x top"></i> ${gem.name} - ${gem.city} </span>
                      <p>${gem.description}</p>
                    </div>
                    <div class="card-action">
                      <a href="${gem.photo}">More info</a>
                    </div>
                  </div>
                  <div class="card-reveal col l4">
                      <span class="card-title grey-text text-darken-4">Lat=, Lon=<i class="material-icons right">close</i></span>
                      <p>Info</p>
                    </div>
                </div>`;
    $('#gems').append(cardHtml)
    document
      .getElementById(`${gem._id}`)
      .querySelector(".card-image").style.backgroundImage = `url("${gem.photo}")`;
    });
}