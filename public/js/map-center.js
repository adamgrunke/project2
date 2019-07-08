// DOM 
// let getLocationBtn = document.getElementById('getlocation-btn');
// REMOVE TEST ONLY let latLong = document.getElementById('lat-long');
let mapCenterLat;
let mapCenterLng;
let userLocLat;
let userLocLng;

// Event listeners
// getLocationBtn.addEventListener('click',aquireLocation);
document.addEventListener('DOMContentLoaded', aquireLocation);
    // mapCenterLat & mapCenterLng are for the form that posts to the items db.
    mapCenterLat = document.getElementById('lat-center');
    mapCenterLng = document.getElementById('lng-center');
    userLocLat = 0;
    userLocLng = 0;

// Functions
function aquireLocation(){
    if (!navigator.geolocation){
        console.log("Your browser does not support navigator.geolocation");
        // TODO: post message on page as well.
    } else {
        let stopWaiting = 1000 * 7; // timeout is 7 seconds
        let expirationAge = 1000 * 25 // maximum age of location is 25 seconds
        options = {
            enableHighAccuracy: false,
            timeout: stopWaiting,
            maximumAge: expirationAge
        } 
        navigator.geolocation.getCurrentPosition(showLocation, errorCallback, options)
    }
}

function showLocation(position){
    console.log(position)
    mapCenterLat.value = position.coords.latitude;
    mapCenterLng.value = position.coords.longitude;
    loadMap(position.coords.latitude, position.coords.longitude);
}

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
};

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


function loadMapWithPoints(lat_val, lng_val){
    mapboxgl.accessToken = "pk.eyJ1Ijoib25vcm9mZiIsImEiOiJjanhjNzUycW8wMGRzM3BueHFsajJvbjRwIn0.XA0Kl6rjZ7NaRnzWAiAf9w"
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: markerCoords[0],
        zoom: 9
    })

    const geoJson = {
        "type": "FeatureCollection",
        "features": markerCoords.map( function(coord) {
            let marker = {
                "type": "Feature",
                "properties": {
                    "iconSize": [60,60]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": coord
                }
            }
            return marker
        })
    }


    geoJson.features.forEach( function(feature) {
        new mapboxgl.Marker({anchor: 'center'})
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
    })
}