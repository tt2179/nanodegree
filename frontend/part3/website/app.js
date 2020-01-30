// Open Weather Map API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '29e79f48367d5548d38747980120a4d2';

async function getWeather() {
    const zipElem = document.querySelector('#zip');
    const weatherUrl = `${baseUrl}zip=${zipElem.value}&apiKey=${apiKey}`;
    
    const res = await fetch(weatherUrl);
    try {
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function postData(url = '', data = {}) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

async function getData(url = '') {
    
    const res = await fetch(url);
    try {
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function processData() {
    const feelingsElem = document.querySelector('#feelings');
    const dateElem = document.querySelector('#date');
    const tempElem = document.querySelector('#temp');
    const contentElem = document.querySelector('#content');

    getWeather()
        .then((weatherData) => {
            const data = {};

            data.temperature = getConvertedTemperature(weatherData.main.temp);
            data.date = getCurrentDate();
            data.feelings = feelingsElem.value;
            
            return data;
        })
        .then((data) => {
            postData('/weather', data);
        })
        .then(() => {
            getData('/weather').then(data => {
                dateElem.innerHTML = data.date;
                tempElem.innerHTML = data.temperature;
                contentElem.innerHTML = data.feelings;
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const generateElem = document.querySelector('#generate');
    generateElem.addEventListener('click', processData);
});


// Helper functions
function getCurrentDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
}

function getConvertedTemperature(temp) {
    const celcius = temp - 273.15;
    const fahrenheit = celcius * (9/5) + 32;

    return `${Math.round(celcius)} &degC / ${Math.round(fahrenheit)} &degF`;
}