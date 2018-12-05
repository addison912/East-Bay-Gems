$(document).ready(function() {
  if (JSON.parse(sessionStorage.getItem("loggedIn"))) {
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
  }
});
