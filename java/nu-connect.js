function bikes() {
	// construct request
	var request = "http://api.citybik.es/v2/networks/nextbike-maastricht";
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// show full JSON object
		console.log(response);
		// render weatherCondition
		onAPISuccesBike(response);
	})
	
	// catch error
	.catch(function (error) {
		onAPIErrorBike(error);
	});
}


function onAPISuccesBike(response) {
    
	var locationList = response.network.stations;
	var bikeBox = document.getElementById('bike-box');

	for(var i=0; i< locationList.length; i++){
//		console.log(locationList[i].name);

		var locatie = locationList[i].name;
		var aantal = locationList[i].free_bikes;

		bikeInfo =     '<div class="bike-info">';
		bikeInfo +=        '<div class="bike-cont">';
		bikeInfo +=            '<div class="locatie"> '+locatie+' </div>';
		bikeInfo +=            '<div class="time"> '+ aantal +' </div>';
		bikeInfo +=        '</div>';
		bikeInfo +=    '</div>';

		bikeBox.innerHTML += bikeInfo;
	}
}

function onAPIErrorBike(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
bikes();
