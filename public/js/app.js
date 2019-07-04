// DOM 
// let getLocationBtn = document.getElementById('getlocation-btn');
// REMOVE TEST ONLY let latLong = document.getElementById('lat-long');
let mapCenterLat = document.getElementById('lat-center');
let mapCenterLng = document.getElementById('lng-center');
let userLocLat = 0;
let userLocLng = 0;

// from Kelsey
// const shopsCoords = shops.map(function(shop){
//     return {
//         lat: shop.latitude,
//         lng: shop.longitude,    }
// })


// Event listeners
// getLocationBtn.addEventListener('click',aquireLocation);
document.addEventListener('DOMContentLoaded', aquireLocation);
// Functions
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
    // REMOVE-TEST ONLY latLong.textContent = `Quick copy lat/long: ${position.coords.latitude}, ${position.coords.longitude}`
    mapCenterLat.value = position.coords.latitude;
    mapCenterLng.value = position.coords.longitude;
    // userLocLat = position.coords.latitude;
    // userLocLng = position.coords.longitude;
    console.log(position.coords.latitude, position.coords.longitude)
    loadMap(position.coords.latitude, position.coords.longitude);

}

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
  };
// use the map array simililar to the mapfun... call load map in that instead of retyping the code below. 
// this is for the show all items.

function loadMap(lat_val, lng_val){
    mapboxgl.accessToken = 'pk.eyJ1Ijoib25vcm9mZiIsImEiOiJjanhjNzUycW8wMGRzM3BueHFsajJvbjRwIn0.XA0Kl6rjZ7NaRnzWAiAf9w';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {lng: lng_val, lat: lat_val},
        zoom: 17
    });
    const geoJson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
                "iconSize": [60,60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": {lng: lng_val, lat: lat_val}
            }
        }]
    }
    
    geoJson.features.forEach( function(feature) {
        new mapboxgl.Marker({anchor: 'center'})
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
    })
}