const localData = {
    destination: '',
    departureDate: '',
    geonamesData: {},
    darkskyData: {},
    pixabayData: {}
};

const imagePlace = document.getElementById('travelImage');
const spanCountdown = document.getElementById('travelCountdown');
const sectionWeather = document.getElementById('travelWeather');

imagePlace.addEventListener('load', () => {
    imagePlace.classList.remove('unload-pic');
    imagePlace.classList.add('load-pic');
});

async function processInput(inputPlace, inputDate) {
    let geonamesData, darkskyData, pixabayData;
    let validDate;
    let validTime;

    try {
        validDate = new Date(Date.parse(inputDate.value));
        validTime = validDate.getTime() / 1000;
    } catch (e) {
        console.error(e);
    }

    imagePlace.classList.remove('load-pic');
    imagePlace.classList.add('unload-pic');
    geonamesData = await Client.getGeonamesData(inputPlace.value);

    if(geonamesData.totalResultsCount && geonamesData.totalResultsCount > 0) {
        darkskyData = await Client.getDarkskyData(
            geonamesData.geonames[0].lat,
            geonamesData.geonames[0].lng,
            validTime
        );
        pixabayData = await Client.getPixabayData(inputPlace.value);

        if(pixabayData.total === 0) {
            pixabayData = await Client.getPixabayData(geonamesData.geonames[0].countryName);
        }
    }

    localData.destination = inputPlace.value;
    localData.departureDate = validDate;
    localData.geonamesData = geonamesData;
    localData.darkskyData = darkskyData;
    localData.pixabayData = pixabayData;

    refreshDOM();
}

function refreshDOM() {
    if(localData.geonamesData.totalResultsCount && localData.geonamesData.totalResultsCount > 0) {
        imagePlace.src = localData.pixabayData.hits[0].largeImageURL;

        if(localData.departureDate !== '' && !isNaN(localData.departureDate)) {
            let todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            let daysRemaining = getDaysRemaining(todayDate, localData.departureDate);
            spanCountdown.innerHTML = (daysRemaining > 0) ? `${Math.abs(daysRemaining)} more days!` : `${Math.abs(daysRemaining)} days ago...`;
        } else {
            spanCountdown.innerHTML = '';
        }

        sectionWeather.innerHTML = `<ul>
            <li>${localData.geonamesData.geonames[0].name}, ${localData.geonamesData.geonames[0].countryName}</li>
            <li>${localData.darkskyData.currently.summary} ${getWeatherIcon(localData.darkskyData.currently.icon)}</li>
            <li>Currently: ${localData.darkskyData.currently.temperature}&deg;</li>
            <li>Low: ${localData.darkskyData.daily.data[0].temperatureLow}&deg; - High: ${localData.darkskyData.daily.data[0].temperatureHigh}&deg;</li>
        </ul>`;
    } else {
        spanCountdown.innerHTML = '';
        sectionWeather.innerHTML = 'Unknown location - Please try again';
        imagePlace.src = './src/client/media/globe-1920x1280.jpg';
    }

}

function getWeatherIcon(icon) {
    let weatherIcon = '<span class="oi" data-glyph="flag"></span>';
    let rxRain = /rain/g;
    let rxPartly = /partly/g;
    let rxCloudy = /cloudy/g;
    let rxClear = /clear/g;
    let rxNight = /night/g;

    if(rxNight.test(icon)) {
        weatherIcon = '<span class="oi" data-glyph="moon"></span>';
    } else if(rxPartly.test(icon)) {
        weatherIcon = '<span class="oi" data-glyph="cloudy"></span>';
    } else if(rxCloudy.test(icon)) {
        weatherIcon = '<span class="oi" data-glyph="cloud"></span>'
    } else if(rxRain.test(icon)) {
        weatherIcon = '<span class="oi" data-glyph="rain"></span>';
    } else if(rxClear.test(icon)) {
        weatherIcon = '<span class="oi" data-glyph="sun"></span>';
    }

    return weatherIcon;
}

function getDaysRemaining (todayDate, departureDate) {
    let msPerDay = 24 * 60 * 60 * 1000;
    let daysRemaining = (departureDate.getTime() - todayDate.getTime()) / msPerDay;
    return Math.abs(daysRemaining) > 0 && Math.abs(daysRemaining) < 1 ? 0 : Math.round(daysRemaining);
}

export {
    processInput
};