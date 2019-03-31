function amsterdam() {

	var url = "https://api.openweathermap.org/data/2.5/weather",
        apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2",
        city = "kiev";

	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
    
    console.log(request);
	
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
		onAPISuccesAmsterdam(response);
	})
	
	// catch error
	.catch(function (error) {
		onAPIErrorAmsterdam(error);
	});
}


function onAPISuccesAmsterdam(response) {
	// get type of weather in string format
	var icon = response.weather[0].icon,
        disc = response.weather[0].description,
        maxTemp = Math.floor(response.main.temp_max - 273.15),
        minTemp = Math.floor(response.main.temp_min - 273.15);

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var iconBox = document.getElementById('Aicon'),
        tempBox = document.getElementById('Atemp'),
        discBox = document.getElementById('Adisc'),
        minTempBox = document.getElementById('Amin'),
        maxTempBox = document.getElementById('Amax'),
        myImg ="foto/weather-icons/",
        iconUrl = myImg + icon + '.png';
    
    
    iconBox.innerHTML = '<img src="'+iconUrl+'">';
    tempBox.innerHTML = degC + "&#176;C";
    minTempBox.innerHTML = 'Min. ' + minTemp + "&#176;C";
    maxTempBox.innerHTML = 'Max. ' + maxTemp + "&#176;C";
    
    var uitspraakA = document.getElementsByClassName('uitspraakA')[0];
    
    if (degC >= 9) {
        $('#amsterdam').css({
            "border-color": "green",
            "border-width": "2px",
            "border-style": "solid"
        })
        $('#amsterdam #Atemp').css({
            "color": "white"
        })
        uitspraakA.innerHTML = 'Landen toegestaan';
    } else {
        $('#amsterdam').css({
            "border-color": "red",
            "border-width": "2px",
            "border-style": "solid"
        })
        $('#amsterdam #Atemp').css({
            "color": "#0af"
        })
        uitspraakA.innerHTML = 'Landen niet toegestaan';
    };
    
    if (icon == '01d' || icon == '01n') {
        discBox.innerHTML = 'Helder';
    };
    
    if (icon == '02d' || icon == '02n') {
        discBox.innerHTML = 'Licht bewolkt';
    };
    
    if (icon == '03d' || icon == '03n') {
        discBox.innerHTML = 'Gedeeltelijk bewolkt';
    };
    
    if (icon == '04d' || icon == '04n') {
        discBox.innerHTML = 'Bewolkt';
    };
    
    if (icon == '09d' || icon == '09n') {
        discBox.innerHTML = 'Regen';
    };
    
    if (icon == '10d' || icon == '10n') {
        discBox.innerHTML = 'Lichte regen';
    };
    
    if (icon == '11d' || icon == '11n') {
        discBox.innerHTML = 'Onweer';
    };
    
    if (icon == '13d' || icon == '13n') {
        discBox.innerHTML = 'Sneeuw';
    };
    
    if (icon == '50d' || icon == '50n') {
        discBox.innerHTML = 'Mist';
    };
}

function onAPIErrorAmsterdam(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
amsterdam();
