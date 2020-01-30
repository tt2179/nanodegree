const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 7000;
const projectData = {};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

app.listen(port, serverCallback);

function serverCallback() {
    console.log(`Server listening on port ${port}...`);
}

app.get('/weather', (req, res) => {
    res.send(projectData);
});

app.post('/weather', (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;

    res.end();
});