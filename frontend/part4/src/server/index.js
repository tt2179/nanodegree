const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const aylien = require("aylien_textapi");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()

app.use(cors())
app.use(express.static('dist'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

function sentimentApi(res, text, url) {
    let data = text? {text: text} : {url: url};

    textapi.sentiment(data, function(error, response) {
        if (error === null) {
            res.send(response);
        } else {
            console.log(error);
            res.status(400);
            res.end();
        }
    });
}

function classifyApi(res, text, url) {
    let data = text? {text: text} : {url: url};

    textapi.classify(data, function(error, response) {
        if (error === null) {
            res.send(response);
        } else {
            console.log(error);
            res.status(400);
            res.end();
        }
    });
}

app.get('/sentiment/phrase/:text', function (req, res) {
    sentimentApi(res, req.params.text, undefined);
});
app.post('/sentiment/url', function (req, res) {
    sentimentApi(res, undefined, req.body.url);
});

app.get('/classify/phrase/:text', function (req, res) {
    classifyApi(res, req.params.text, undefined)
});
app.post('/classify/url', function (req, res) {
    classifyApi(res, undefined, req.body.url);
});