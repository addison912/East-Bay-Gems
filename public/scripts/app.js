$(document).ready(function() {
  console.log("Sanity check");
  $(".slider").slider({
    height: 800
  });
  $("select").formSelect();

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
      var url = elem.url;
      var lat = elem.coordinates.lat;
      var lng = elem.coordinates.lng;

      // <img class="activator right" src="${image}">

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
                        <span class="card-title grey-text text-darken-4">Lat: ${lat} and Lon: ${lng}<i class="material-icons right">close</i></span>
                        <p>Info</p>
                      </div>
                  </div>`;
      $("#gems").append(cardHtml);
      document
        .getElementById(`${placeId}`)
        .querySelector(".card-image").style.backgroundImage = `url("${image}")`;
    });
  }
  function placeError() {
    console.log("error");
  }

  $("#places").on("click", function() {
    $("#places_menu").toggleClass("hide");
  });
});

$(document).ready(function() {
  $(".modal").modal();
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  $("#sign-in-button").toggleClass("hide");
  $("#nav-profile-pic").toggleClass("hide");
  document.getElementById(
    "nav-profile-pic"
  ).style.backgroundImage = `url("${profile.getImageUrl()}")`;
}

function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure
  });
}
