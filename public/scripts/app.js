var results = [];
var allPlaces;
var allPeople;

var checkHidden = function() {
  if ($("#places").is(":checked") && $("#people").is(":checked")) {
    $(".place").removeClass("hide");
    $(".person").removeClass("hide");
  } else if (!$("#places").is(":checked") && !$("#people").is(":checked")) {
    $(".place").removeClass("hide");
    $(".person").removeClass("hide");
  } else if (!$("#places").is(":checked") && $("#people").is(":checked")) {
    $(".place").addClass("hide");
    $(".person").removeClass("hide");
  } else if ($("#places").is(":checked") && !$("#people").is(":checked")) {
    $(".person").addClass("hide");
    $(".place").removeClass("hide");
  }
};
$(document).ready(function() {
  console.log("Sanity check");
  $(".modal").modal();
  $(".slider").slider({
    height: 800
  });
  $(".fixed-action-btn").floatingActionButton();
  $("select").formSelect();
  $(".sidenav").sidenav();
  $("#places").on("click", function() {
    $("#places_menu").toggleClass("hide");
    checkHidden();
  });
  $("#people").on("click", function() {
    checkHidden();
  });
  $("#gemSelector").change(function() {
    if ($(this).val() == "place") {
      $("#submitPlace").removeClass("hide");
      $("#submitPerson").addClass("hide");
    }
    if ($(this).val() == "person") {
      $("#submitPerson").removeClass("hide");
      $("#submitPlace").addClass("hide");
    }
  });
  $("#like-button").on("click", function() {
    console.log("hello");
  });

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
    populate();
    console.log(results);
  }
  function placeError() {
    console.log("error");
  }
  function featError() {
    console.log("error");
  }
  function peopleError() {
    console.log("error");
  }

  // post new place
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
  $("#newPersonForm").on("submit", function(e) {
    $.ajax({
      method: "POST",
      url: "/api/people",
      data: $(this).serialize(),
      success: newPersonSuccess
    });

    function newPersonSuccess(json) {
      console.log(json);
    }
  });

  $("#gems").on("click", ".halfway-fab", function() {
    let gem = this.name;
    console.log(gem);
  });

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

let populate = () => {
  gems = allPeople.concat(allPlaces);
  results = shuffle(gems);
  results.forEach(gem => {
    cardHtml = `<div attr="${gem.city}" class="${
      gem.gem
    } card small horizontal hoverable" id=${gem._id}>
                  <div class="card-image waves-effect waves-block waves-light">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content"><a name="${
                      gem._id
                    }" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
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
    if (document.getElementById("gems")) {
      $("#gems").append(cardHtml);
      document
        .getElementById(`${gem._id}`)
        .querySelector(".card-image").style.backgroundImage = `url("${
        gem.photo
      }")`;
    }
  });
};
