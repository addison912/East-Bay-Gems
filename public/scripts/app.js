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
});
var arrayOfPlaces = [];
var arrayOfPeople = [];
function featError() {
  console.log("error");
}
$.ajax({
  method: "GET",
  url: "/api/places/featured",
  success: featSuccess,
  error: featError
});
function featSuccess(places) {
  places.forEach(elem => {
    var placeId = elem._id;
    var type = elem.type;
    var feat = elem.isFeatured;
    var name = elem.name;
    var city = elem.city;
    var desc = elem.description;
    var image = elem.photo;
    var url = elem.url;

    cardHtml = `<li>
                  <img src="${image}" />
                  <div class="caption center-align">
                    <h3>${name}</h3><span>${city}</span>
                    <h5 class="light grey-text text-lighten-3">${desc}</h5>
                    <h6>Submited by ${"user"}</h6>
                  </div>
              </li>`;
    $(".slides").append(cardHtml);
  });
}

$.ajax({
  method: "GET",
  url: "/api/places",
  success: placeSuccess,
  error: placeError
});

function placeSuccess(places) {
  places.forEach(elem => {
    var placeId = elem._id;
    var type = elem.type;
    var feat = elem.isFeatured;
    var name = elem.name;
    var city = elem.city;
    var desc = elem.description;
    var image = elem.photo;
    /* var lat = elem.coordinates.lat;
    console.log(lat);
    var lng = elem.coordinates.lng; */
    var url = elem.url;

    cardHtml = `<div class="card small horizontal hoverable" id=${placeId}>
                  <div class="card-image waves-effect waves-block waves-light">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4"><i class="far fa-gem fa-1x top"></i> ${name} - ${city} </span>
                      <p>${desc}</p>
                    </div>
                    <div class="card-action">
                      <a href="${url}">More info</a>
                    </div>
                  </div>
                  <div class="card-reveal col l4">
                      <span class="card-title grey-text text-darken-4">Lat=, Lon=<i class="material-icons right">close</i></span>
                      <p>Info</p>
                    </div>
                </div>`;

    document
      .getElementById(`${placeId}`)
      .querySelector(".card-image").style.backgroundImage = `url("${image}")`;
  });
}
function placeError() {
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
    $("#newPlaceForm input").val("");
    arrayOfPlaces.push(json);
    console.log(json);
    renderPlace();
  }

  function renderPlace() {
    $("#gems").empty();
    arrayOfPeople = placeSuccess(places);
  }
});

$(document).ready(function() {
  $(".modal").modal();
});
