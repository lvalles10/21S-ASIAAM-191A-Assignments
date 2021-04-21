let a = [34.0709, -118.444]
let b = 5;

let mapConfig = {"center": [34.0709, -118.444],"zoomLevel":5}


const map = L.map('map').setView([center, zoomLevel], 5);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers
let work = L.marker([34.0709, -118.444]).addTo(map)
		.bindPopup('Where I work on campus')

let home = L.marker([37.7409, -122.484]).addTo(map)
		.bindPopup('Where I currently am')

let random = L.marker([39.7409, -122.484]).addTo(map)
		.bindPopup('Third Point')

function addMarker(lat,lng,message){
    console.log(message)
    L.marker([lat, lng]).addTo(map)
    return message

}

addMarker(38,-112,"WOAH!!!!!!!!!")

