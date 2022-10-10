'use strict';


//setup
require('dotenv').config();
//express server
const express = require('express');
//allows Cross origin Resource Sharing
const cors = require('cors');
//load data
const data = require('./data/weather.json');
// start the server
const app = express();

//Middleware
app.use(cors());


// PORT variable
const PORT = process.env.PORT || 3001;

// listen for connection
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

//endpoints ---------

app.get('/', (req, res) => {
    res.send('hi from home');
})

app.get('/weather', (req, res) => {
    if (req.query) {
        console.log(req.query);
        const search = Object.keys(req.query)[0].split(',')[0].toLowerCase();
        const matched = data.filter(x => x.city_name.toLowerCase().includes(search));
        console.log(matched);
        res.send(matched);
    }
    else {
        res.status(404).send('Not Found');
    }
});

// catch all endpoint

app.get('*', (req, res) => {
    res.status(404).send('page not found')
});






