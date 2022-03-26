// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request } = require('http');

// Start up an instance of app
const app = express();
const port = process.env.PORT || 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors({origin: true}));

app.get('/hello', (req, res) => {
    res.send("Hello word")
  //res.send(projectData);
});

app.post('/send', (req, res) => {
    const { temperature, date, userResponse } = req.body;

   projectData = {
    'temperature': temperature,
    'date': date,
    'userresponse': userResponse
   }

    res.send(projectData);
  });

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
  console.log(`Server running at http://${port}...`);
});