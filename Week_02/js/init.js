// JavaScript const variable declaration
let map = L.map('map').setView([34.0709, -118.444], 15);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([37.618261, -122.442031]).addTo(map)
		.bindPopup('Crystal Springs Reservoir')
		.openPopup();

let marker2 = L.marker([37.618465, -122.492506]).addTo(map)
		.bindPopup('Mori Point')
		.openPopup();

let marker3 = L.marker([37.639592, -122.475897]).addTo(map)
		.bindPopup('Milagra Ridge')
		.openPopup();

let marker4 = L.marker([37.595297, -122.507887]).addTo(map)
		.bindPopup('Linda Mar Beach')
		.openPopup();

// Fetch method
fetch("js/map.geojson")
.then(response => {
	console.log(response)
    return response.json()
})
.then(data =>{
    // Basic Leaflet method to add GeoJSON data
    L.geoJSON(data, myLayerOptions)
    .bindPopup(function (layer) {
        return layer.feature.properties.place;
    }).addTo(map);
})

// // the leaflet method for adding a geojson
// L.geoJSON(data, {
// style: function (feature) {
//     return {color: 'red'};
// }
// }).bindPopup(function (layer) {
// return layer.feature.properties.name;
// }).addTo(map);

// create an options object