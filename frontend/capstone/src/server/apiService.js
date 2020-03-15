const process = require('process');
const dotenv = require('dotenv');
const utility = require('./utility');

dotenv.config();

// Remote API Configuration
const geonames = {
    apiKey: process.env.GEONAMES_API_KEY,
    apiProtocol: 'http:',
    apiHostname: 'api.geonames.org',
    apiPath: '/searchJSON?',
    apiParamKey: '&username=',
    apiParamQuery: '&q=',
    apiURL: function (searchTerm) {
        return this.apiPath
        + this.apiParamKey
        + this.apiKey
        + this.apiParamQuery
        + searchTerm;
    }
};
const darksky = {
    apiKey: process.env.DARKSKY_API_KEY,
    apiProtocol: 'https:',
    apiHostname: 'api.darksky.net',
    apiPath: '/forecast',
    apiURL: function (latitude, longitude, time) {
        let searchTerm = utility.delimitValues([latitude, longitude, time]);
        return this.apiPath + '/'
            + this.apiKey + '/'
            + searchTerm;
    }
};
const pixabay = {
    apiKey: process.env.PIXABAY_API_KEY,
    apiProtocol: 'https:',
    apiHostname: 'pixabay.com',
    apiPath: '/api',
    apiParamKey: '&key=',
    apiParamQuery: '&q=',
    apiURL: function (searchTerm) {
        return this.apiPath + '/?'
        + this.apiParamKey
        + this.apiKey
        + this.apiParamQuery
        + searchTerm;
    }
};

function geonamesApi(req) {
    const options = {
        protocol: geonames.apiProtocol,
        hostname: geonames.apiHostname,
        path: geonames.apiURL(encodeURIComponent(req.params.searchTerm))
    };

    return utility.httpHelper(options).then(data => data);
}

function darkskyApi(req) {
    const options = {
        protocol: darksky.apiProtocol,
        hostname: darksky.apiHostname,
        path: darksky.apiURL(req.params.latitude, req.params.longitude)
    };

    return utility.httpHelper(options).then(data => data);
}

function pixabayApi(req) {
    const options = {
        protocol: pixabay.apiProtocol,
        hostname: pixabay.apiHostname,
        path: pixabay.apiURL(encodeURIComponent(req.params.searchTerm))
    };

    return utility.httpHelper(options).then(data => data);
}

module.exports = {
    geonamesApi,
    darkskyApi,
    pixabayApi
};