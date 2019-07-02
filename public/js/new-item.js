// DOM 
let getLocationBtn = document.getElementById('getlocation-btn');
let latLong = document.getElementById('lat-long');

// Event listeners
getLocationBtn.addEventListener('click',aquireLocation);

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

}

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
  };
