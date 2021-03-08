var path = require('path');
const express = require('express');

// Start up an instance of app

const app = express()

/* Middleware*/

//Here we are configuring express to use body-parser and cors  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));





// Setup Server  - 

const port = 3000;

const server = app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};




