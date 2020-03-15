const serverPrefix = 'http://localhost:8081';

async function getGeonamesData(searchTerm) {
    let url = `${serverPrefix}/geonames/${searchTerm}`;

    return fetch(url)
        .then(data => data.json());
}

async function getDarkskyData(latitude, longitude, time) {
    let optionalTime = time ? `/${time}` : '';
    let url = `${serverPrefix}/darksky/${latitude}/${longitude}` + optionalTime;

    return fetch(url)
        .then(data => data.json());
}

async function getPixabayData(searchTerm) {
    let url = `${serverPrefix}/pixabay/${searchTerm}`;

    return fetch(url)
        .then(data => data.json());
}

export {
    getGeonamesData,
    getDarkskyData,
    getPixabayData
};