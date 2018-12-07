function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  let userData = {
    username: profile.getName(),
    uid: profile.getId(),
    email: profile.getEmail(),
    fullName: profile.getName(),
    imageUrl: profile.getImageUrl(),
    likes: [],
    posts: []
  };

  userData = JSON.stringify(userData);

  checkForUser(profile.getId());

  function checkForUser(id) {
    $.ajax({
      method: "GET",
      url: `/api/users/${id}`,
      success: userSuccess,
      error: userError
    });
  }
  function userSuccess(user) {
    if (user) {
      console.log(user.username + " already exists");
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      sessionStorage.setItem("loggedIn", true);
    } else {
      createNewUser(userData);
      console.log("creating new user: " + profile.getName());
    }
  }
  function userError() {
    console.log("error retrieving user data");
  }

  function createNewUser(userData) {
    $.ajax({
      method: "POST",
      url: "/api/users",
      contentType: "application/json",
      data: userData,
      dataType: "json",
      success: createUserSuccess,
      error: createUserError
    });
  }
  function createUserSuccess(user) {
    console.log("created new user");
  }
  function createUserError() {
    console.log("unable to create a new user");
  }

  //hide login button and replace it with user profile pic
  $("#sign-in-button").toggleClass("hide");
  $("#nav-profile-pic").toggleClass("hide");
  document.getElementById(
    "nav-profile-pic"
  ).style.backgroundImage = `url("${profile.getImageUrl()}")`;
}

function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  console.log(googleUser.getBasicProfile());
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

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
    sessionStorage.clear();
    location.reload();
  });
}

$(".dropdown-trigger").dropdown({ constrainWidth: false });
$(".modal").modal();
