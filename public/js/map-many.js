// DOM 
// let getLocationBtn = document.getElementById('getlocation-btn');
// REMOVE TEST ONLY let latLong = document.getElementById('lat-long');
let userLocLat;
let userLocLng;
// Event listeners
// getLocationBtn.addEventListener('click',aquireLocation);
document.addEventListener('DOMContentLoaded', aquireLocation);
 
    // userLocLat = 0;
    // userLocLng = 0;

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
        zoom: 15
    });
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
    // map.on('load', function(){
    //     let layers = map.getStyle().layers;
    //     let labelLayerId;
    //     for (let i = 0; i < layers.length; i++) {
    //         if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    //             labelLayerId = layers[i].id;
    //             break;
    //         }
    //     }
    //     map.addLayer({
    //         "id": "3d-buildings",
    //         "source": "composite",
    //         "source-layer": "building",
    //         "filter": ["==", "extrude", "true"],
    //         "type": "fill-extrusion",
    //         "minzoom": 12,
    //         "paint": {
    //             "fill-extrusion-color": "#009e60",
    //             "fill-extrusion-height": [
    //                 "interpolate",
    //                 ["linear"],
    //                 ["zoom"],
    //                 12,
    //                 0,
    //                 12.05,
    //                 ["get" , "height"]
    //             ],
    //             "fill-extrusion-base": [
    //                 "interpolate",
    //                 ["linear"],
    //                 ["zoom"],
    //                 12,
    //                 0,
    //                 12.05,
    //                 ["get" , "min_height"]
    //             ],
    //             "fill-extrusion-opacity": 0.6
    //         }
    //     }, labelLayerId)
    // });
    // geoJson.features.forEach( function(feature) {
    //     // create a DOM element for the marker
    //     var el = document.createElement('div');
    //     el.className = 'marker';
    //     el.style.backgroundImage = 'url(https://www.freepik.com/free-vector/location_2900811.htm)';
    //     el.style.width = 50 + 'px';
    //     el.style.height = 50 + 'px';
    
    //     el.addEventListener('click', function () {
    //         console.log("testTEST")
    //         // document.getElementById('message').textContent = marker.properties.message
    //     });
    
    //     new mapboxgl.Marker({element: el, anchor: 'center'})

    //     .setLngLat(feature.geometry.coordinates)
    //     .addTo(map)
    // })
}


