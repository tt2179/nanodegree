const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiService = require('./apiService');

const server = express();
const port = 8081;

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(express.static('dist'));

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Routes to call remote APIs
server.get('/geonames/:searchTerm', (req, res) => {
    apiService.geonamesApi(req, res).then(data => res.send(data));
});

server.get('/darksky/:latitude/:longitude/:time?', (req, res) => {
    apiService.darkskyApi(req, res).then(data => res.send(data));
});

server.get('/pixabay/:searchTerm', (req, res) => {
    apiService.pixabayApi(req, res).then(data => res.send(data));
});