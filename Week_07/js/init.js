const map = L.map('map').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/18UGaqNA_XlhgrzZs-cpZd8pUdWXg0f-MeslJ9L9YwXc/on609jc/public/values?alt=json"

let Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});

Esri_WorldPhysical.addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let enjoy = L.featureGroup();
let didnotenjoy = L.featureGroup();

let exampleOptions = {
    radius: 10,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

function addMarker(data){
    if(data.didyounenjoyit == "Yes"){
        exampleOptions.fillColor = "yellow"
        enjoy.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).addTo(map).bindPopup(`<h2>Enjoyable Trail!<h2>` + "<br>" + 'What did you enjoy about it?: ' + data.why))
        createButtons(data.lat,data.lng,data.location)
        }
    else{
        exampleOptions.fillColor = "teal"
        didnotenjoy.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).addTo(map).bindPopup(`<h2>Not the best trail :(</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng],8);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        enjoy.addTo(map)
        didnotenjoy.addTo(map)
        let allLayers = L.featureGroup([speakFluentEnglish,speakOtherLanguage]);
        map.fitBounds(allLayers.getBounds());        
}

let layers = {
	"I enjoyed it!": enjoy,
	"I didn't enjoy it :(": didnotenjoy
}

L.control.layers(null,layers).addTo(map)