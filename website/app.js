/* Global Variables */
const apiHeaders = {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': ''
  };

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async(url, zip, key) => {
    const options = {
        method: 'GET',
    };

    return fetch(`${url}?zip=${zip},us&appid=${key}&units=imperial`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

const sendWeather = async(url, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

const writeResponse = async(temperature, date, userInput) => {
    document.getElementById('temp').innerHTML = temperature;
    document.getElementById('date').innerHTML = date;
    document.getElementById('content').innerHTML = userInput;
}

document.getElementById("generate").addEventListener("click", function() {
    const key = '348aff9092458caa76ebb77b75c060fe';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const zip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    const currentWeather = getWeather(apiUrl, zip, key).then(function (currentWeather) {    
        const data = {
            temperature: currentWeather.main.temp,
            date: new Date(),
            userResponse: userResponse,
        };

        sendWeather('http://localhost:3000/send',data).then(function(response) {   
            writeResponse(response.temperature, new Date(response.date), response.userresponse)
        });
    });


});