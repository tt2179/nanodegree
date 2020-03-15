const process = require('process');

const geonamesData = {
    'Quincy': {
        'totalResultsCount': 750,
        'geonames': [
            {
                'adminCode1': 'MA',
                'lng': '-71.00227',
                'geonameId': 4948247,
                'toponymName': 'Quincy',
                'countryId': '6252001',
                'fcl': 'P',
                'population': 93618,
                'countryCode': 'US',
                'name': 'Quincy',
                'fclName': 'city, village,...',
                'adminCodes1': {
                    'ISO3166_2': 'MA'
                },
                'countryName': 'United States',
                'fcodeName': 'populated place',
                'adminName1': 'Massachusetts',
                'lat': '42.25288',
                'fcode': 'PPL'
            }
        ]
    }
};

const darkskyData = {
    '42.25288/-71.00227': {
        'latitude': 42.25288,
        'longitude': -71.00227,
        'timezone': 'America/New_York',
        'currently': {
            'time': 1584201016,
            'summary': 'Clear',
            'icon': 'clear-day',
            'nearestStormDistance': 60,
            'nearestStormBearing': 329,
            'precipIntensity': 0,
            'precipProbability': 0,
            'temperature': 48.69,
            'apparentTemperature': 44.36,
            'dewPoint': 23.49,
            'humidity': 0.37,
            'pressure': 1022,
            'windSpeed': 9.58,
            'windGust': 20.66,
            'windBearing': 272,
            'cloudCover': 0.01,
            'uvIndex': 5,
            'visibility': 10,
            'ozone': 319.8
        },
        'flags': {
            'sources': [
                'nwspa',
                'cmc',
                'gfs',
                'hrrr',
                'icon',
                'isd',
                'madis',
                'nam',
                'sref',
                'darksky',
                'nearest-precip'
            ],
            'nearest-station': 1.585,
            'units': 'us'
        },
        'offset': -4
    }
};

const pixabayData = {
    'Quincy': {
        'total': 1,
        'totalHits': 1,
        'hits': [
            {
                'id': 4908872,
                'pageURL': 'https://pixabay.com/vectors/john-quincy-adams-president-4908872/',
                'type': 'vector/svg',
                'tags': 'john quincy adams, president, united states of america',
                'previewURL': 'https://cdn.pixabay.com/photo/2020/03/07/06/29/john-quincy-adams-4908872_150.png',
                'previewWidth': 128,
                'previewHeight': 150,
                'webformatURL': 'https://pixabay.com/get/52e9d54b4255ae14f6da8c7dda79367b103bdbe15a566c4870277fd6974cc559bf_640.png',
                'webformatWidth': 547,
                'webformatHeight': 640,
                'largeImageURL': 'https://pixabay.com/get/52e9d54b4255ae14f6da8c7dda79367b103bdbe15a566c4870277fd6974cc559bf_1280.png',
                'imageWidth': 1640,
                'imageHeight': 1920,
                'imageSize': 841115,
                'views': 128,
                'downloads': 58,
                'favorites': 4,
                'likes': 13,
                'comments': 15,
                'user_id': 1086657,
                'user': 'GDJ',
                'userImageURL': 'https://cdn.pixabay.com/user/2015/12/02/23-35-18-266_250x250.png'
            }
        ]
    }
};

function geonamesApi(req) {
    return new Promise((resolve, reject) => {
        const q = req.params.searchTerm;
        process.nextTick(() => {
            geonamesData[q]
                ? resolve(geonamesData[q])
                : reject({ error: 'Not found.' });
        });
    });
}

function darkskyApi(req) {
    return new Promise((resolve, reject) => {
        const q = req.params.latitude + '/' + req.params.longitude;
        process.nextTick(() => {
            darkskyData[q]
                ? resolve(darkskyData[q])
                : reject({ error: 'Not found.' });
        });
    });
}

function pixabayApi(req) {
    return new Promise((resolve, reject) => {
        const q = req.params.searchTerm;
        process.nextTick(() => {
            pixabayData[q]
                ? resolve(pixabayData[q])
                : reject({ error: 'Not found.' });
        });
    });
}

module.exports = {
    geonamesApi,
    darkskyApi,
    pixabayApi
};