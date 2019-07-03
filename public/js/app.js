// DOM 
let getLocationBtn = document.getElementById('getlocation-btn');
let latLong = document.getElementById('lat-long');
let mapCenterLat = document.getElementById('lat-center');
let mapCenterLng = document.getElementById('lng-center');
let userLocLat = 0;
let userLocLng = 0;
// Event listeners
// getLocationBtn.addEventListener('click',aquireLocation);
document.addEventListener('DOMContentLoaded', aquireLocation);
// Functions

// write function that will first check to see if navigator.geolocation is supported by the browser
// if supported, call navigator.geolocation.
function aquireLocation(){
    if (!navigator.geolocation){
        console.log("Your browser does not support navigator.geolocation");
        // TODO: post message on page as well.
    } else {
        let stopWaiting = 1000 * 15; // timeout is 15 seconds
        let expirationAge = 1000 * 60 // maximum age of location is 1 minute
        options = {
            enableHighAccuracy: true,
            timeout: stopWaiting,
            maximumAge: expirationAge
        } 
        navigator.geolocation.getCurrentPosition(showLocation, errorCallback, options)
    }
}

function showLocation(position){
    latLong.textContent = `Quick copy lat/long: ${position.coords.latitude}, ${position.coords.longitude}`
    mapCenterLat.value = position.coords.latitude;
    mapCenterLng.value = position.coords.longitude;
    userLocLat = position.coords.latitude;
    userLocLng = position.coords.longitude;

    loadMap(userLocLat, userLocLng);

}

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
  };

function loadMap(lat, lng){
    mapboxgl.accessToken = 'pk.eyJ1Ijoib25vcm9mZiIsImEiOiJjanhjNzUycW8wMGRzM3BueHFsajJvbjRwIn0.XA0Kl6rjZ7NaRnzWAiAf9w';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {lng: userLocLng, lat: userLocLat},
        zoom: 17
    });
}