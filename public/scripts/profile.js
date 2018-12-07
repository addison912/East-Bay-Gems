let user;
let gems = [];

$(document).ready(function() {
  $("select").formSelect();
  $(".modal").modal();
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
    addLiked();
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

// add user image and name
function addProfileInfo() {
  $("#userImg").attr("src", `${user.imageUrl}`);
  $("#userName").text(user.fullName);
}

//append liked posts to the page
function addLiked() {
  user.likes.forEach(like => {
    for (let i = 0; i < gems.length; i++) {
      if (like == gems[i]._id) {
        let gem = gems[i];
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
                      </div>
                      <div class="card-reveal col l4">
                          <span class="card-title grey-text text-darken-4">Lat=, Lon=<i class="material-icons right">close</i></span>
                          <p>Info</p>
                        </div>
                    </div>`;
        $("#userLikes").append(cardHtml);
        document
          .getElementById(`${gem._id}`)
          .querySelector(".card-image").style.backgroundImage = `url("${
          gem.photo
        }")`;
      }
    }
  });
}

// add user posts to the page
function addPosts() {
  user.posts.forEach(post => {
    for (let i = 0; i < gems.length; i++) {
      if (post == gems[i]._id) {
        let gem = gems[i];
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
                          <a href="#!" class="right deletePost" name="${
                            gem.gem
                          } ${gem._id}">Delete Post</a>
                          <a href="#edit-post" class="right edit modal-trigger">Edit</a>
                        </div>
                      </div>
                      <div class="card-reveal col l4">
                          <span class="card-title grey-text text-darken-4">Lat=, Lon=<i class="material-icons right">close</i></span>
                          <p>Info</p>
                        </div>
                    </div>`;
        $("#userPosts").append(cardHtml);

        // on edit button click open edit form

        // if card contains place open edit place form
        $(`#${gem._id} .edit`).click(() => {
          let category;
          if (gem.gem == "place") {
            category = "places";
            $(`#editPost`)
              .empty()
              .append(
                //  edit place form
                `
                <form id='editPlaceForm' data-id="${gem._id}">
                  <div class="row">
                    <div class="input-field col s12 m6 l6">
                      <input value="${
                        gem.name
                      }" name="name" type="text" required>
                    </div>  
                    <div class="input-field col s12 m6 l6">
                      <select name="city" required>
                        <option value="${gem.city}" selected>${
                  gem.city
                }</option>
                        <option value="Berkeley">Berkeley</option>
                        <option value="Oakland">Oakland</option>
                        <option value="Emeryville">Emeryville</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s12 m6 l6">
                      <input value="${gem.type}" name="type" type="text">
                    </div>
                    <div class="input-field col s12 m6 l6">
                      <input value="${gem.photo}" name="photo" type="text">
                    </div>
                  </div>

                  <div class="input-field col l12">
                    <textarea name="description" class="materialize-textarea">${
                      gem.description
                    }</textarea>
                  </div>
                  <div class="input-field col l12">
                    <input value="${gem.url}" name="url" type="text">
                  </div>

                  <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat"
                    >Cancel</a>
                    <button class="btn waves-effect waves-light modal-close" type="submit" name="action">Submit<i class="material-icons right">send</i>
                    </button>
                  </div>
                </form>`
              );

            // if card contains person open edit person form
          } else if (gem.gem == "person") {
            category = "people";
            $(`#editPost`)
              .empty()
              .append(
                // edit person form
                `<form id='editPersonForm' data-id="${gem._id}" class="col l12">

                 <div class="row">
                    <div class="input-field col l6">
                      <input value="${gem.name}" name="name" type="text">
                    </div>
                    <div class="input-field col l6">
                      <select name="city">
                        <option value="${gem.city}" selected>${
                  gem.city
                }</option>
                        <option value="Berkeley">Berkeley</option>
                        <option value="Oakland">Oakland</option>
                        <option value="Emeryville">Emeryville</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col l6">
                      <input name="photo" value="${gem.photo}" type="text">
                    </div>
                    <div class="input-field col l6">
                      <input name="url" value="${gem.url}" type="text">
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col l12">
                      <textarea name="description" class="materialize-textarea">${
                        gem.description
                      }</textarea>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col l6">
                      <select name="isAlive">
                        <option ${gem.isAlive} disabled selected>Alive?</option>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                      </select>
                    </div> 
                    <div class="modal-footer col l6">
                      <a href="#!" class="modal-close waves-effect waves-green btn-flat"
                      >Cancel</a>
                      <button class="btn waves-effect waves-light modal-close" type="submit" name="action">Submit<i class="material-icons right">send</i></button>
                    </div>
                  </div>
                </form>`
              );
          }

          ///resize form text area to fit text content
          M.textareaAutoResize($("textarea"));
          $("select").formSelect();
          gemSubmit(gem._id, category);
        });

        /// add card image to post
        $(`#${gem._id} .card-image`).css({
          "background-image": `url("${gem.photo}")`
        });
      }
    }
  });

  // delete post on click
  $(".deletePost").on("click", function() {
    let gemType = this.name.split(" ")[0];
    let postId = this.name.split(" ")[1];
    let posts = user.posts;
    if (posts.includes(postId)) {
      var index = posts.indexOf(postId);
      if (index > -1) {
        posts.splice(index, 1);
      }
      console.log(user.posts);
      let stringifiedPosts = JSON.stringify({ posts: posts });
      userPut(user.uid, stringifiedPosts, `Removed Post from profile`);
      deletePost(gemType, postId);
    }
  });
}
function deletePost(gemType, postId) {
  $.ajax({
    method: "DELETE",
    url: `/api/${gemType}/${postId}`,
    data: "data",
    dataType: "json",
    success: deleteSuccess,
    error: deleteError
  });
  function deleteSuccess() {
    console.log("Post Deleted");
    location.reload();
  }
  function deleteError() {
    console.log("Delete Error");
  }
}

// handle form data when it's submitted
function gemSubmit(formId, category) {
  console.log("submit function");
  $("form").submit(function(event) {
    let data = $(this).serialize();
    gemPut(formId, data, category, `successfully edited ${formId}`);
  });
}

// edit gem data function
function gemPut(postId, data, category, successMessage) {
  $.ajax({
    method: "PUT",
    url: `/api/${category}/${postId}`,
    data: data,
    success: updateUserSuccess,
    error: updateUserError
  });
  function updateUserSuccess() {
    console.log(successMessage);
  }
  function updateUserError() {
    console.log("error");
  }
}

//edit user function
function userPut(uid, data, successMessage) {
  $.ajax({
    method: "PUT",
    url: `/api/users/${uid}`,
    contentType: "application/json",
    data: data,
    dataType: "json",
    success: updateUserSuccess,
    error: updateUserError
  });
  function updateUserSuccess() {
    console.log(successMessage);
  }
  function updateUserError() {
    console.log("error");
  }
}
