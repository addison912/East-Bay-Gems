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
    addLiked()
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
function addLiked() {
  user.likes.forEach(like => {
    for (let i = 0; i < gems.length; i++) {
      if (like == gems[i]._id) {
        let gem = gems[i];
        cardHtml = `<div attr="${gem.city}" class="${gem.gem} card small horizontal hoverable" id=${gem._id}>
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

function addPosts() {
  user.posts.forEach(post => {
    for (let i = 0; i < gems.length; i++) {
      if (post == gems[i]._id) {
        let gem = gems[i];
        cardHtml = `<div attr="${gem.city}" class="${gem.gem} card small horizontal hoverable" id=${gem._id}>
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
                          <a href="${gem.url}">More info</a><a href="#!" class="right deletePost" name="${gem.gem} ${gem._id}">Delete Post</a><a href="#!" class="right editPost" name="${gem.gem} ${gem._id}">Edit Post</a>
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

  let posts = user.posts;
  console.log(posts);
  $('.deletePost').on('click', function(){
    let gemType = this.name.split(" ")[0]
    let postId = this.name.split(" ")[1]
    let posts = user.posts;

    if (posts.includes(postId)) {
      var index = posts.indexOf(postId);
      if (index > -1) {
      posts.splice(index, 1);
      }
      console.log(user.posts);

      let stringifiedPosts = JSON.stringify({ posts: posts});

      userPut(user.uid, stringifiedPosts, `Removed Post from profile`);
      deletePost(gemType, postId);
    } 
  })
}
function deletePost(gemType, postId){
  $.ajax({
    method: "DELETE",
    url: `/api/${gemType}/${postId}`,
    data: "data",
    dataType: "json",
    success: deleteSuccess,
    error: deleteError
  });
  function deleteSuccess(){
    console.log('Post Deleted');
    location.reload()
    }
    function deleteError(){
        console.log("Delete Error");
      }
}
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