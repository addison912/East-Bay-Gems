function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.8716, lng: -122.2727 },
    zoom: 2
  });
  places.forEach(function(place) {
    let location = {
      lat: place.coordinates.lat,
      lng: place.coordinates.lng
    };
    let marker = new google.maps.Marker({
      position: location,
      map: map
    });
  });
}
