const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our fields in the google sheets:
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.location}</h2>`+ 
        `<p>${data.enjoy}</p>` + '' + `<p>${data.timestamp}</p>`)
        createButtons(data.lat, data.lng, data.location)
        return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng],15); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
    newButton.style.width = '200px'; // setting the width to 200px
    newButton.style.height = '200px'; // setting the height to 200px
    newButton.style.background = 'beige'; // setting the background color to teal
    newButton.style.color = 'black'; // setting the color to white
    newButton.style.fontSize = '30px'; // setting the font size to 20px
}

let url = "https://spreadsheets.google.com/feeds/list/18UGaqNA_XlhgrzZs-cpZd8pUdWXg0f-MeslJ9L9YwXc/on609jc/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
}