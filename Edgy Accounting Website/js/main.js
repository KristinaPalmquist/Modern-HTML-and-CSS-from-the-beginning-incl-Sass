

function initMap() {
  const loc = { lat: 59.3257, lng: 18.0719 };
  const map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc,
  });
  const marker = new google.maps.Marker({ position: loc, map: map });
}