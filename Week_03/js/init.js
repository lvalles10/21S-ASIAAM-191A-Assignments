// declare variables
let zoomLevel = 15;
const mapCenter = [37.78809414755922, -122.4074391414055];

// use the variables
const map = L.map('map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    createButtons(lat,lng,title); // new line!!!
    return message
}

// create a function to add buttons with a fly to command
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 

    // attach an event listner to the button with Leaflet's map.flyTo
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

// use our marker functions
addMarker(37.79632,-122.40496,'International Hotel','home land!')
addMarker(37.7809, -122.4092,'Bayanihan Center','where i work land!')
addMarker(37.78173663186071, -122.40752259325303,'Pilipino Senior Resource Center','random location')
addMarker(37.778759933059554, -122.41127863540447,'Asian Pacific Islander Legal Outreach','another random location')