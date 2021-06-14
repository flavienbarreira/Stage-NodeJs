const { Validator, ValidationError } = require('express-json-validator-middleware');
const express = require('express');
const path = require('path');
const json = require('./schema.json'); //with path
const generatePDF = require('./generate.js');
const bodyParser = require('body-parser');
const fs = require('fs');

  
// Prise en charge du JSON.  
const app = express();
app.use(bodyParser.json());

var validator = new Validator();
var validate = validator.validate;

// Add CORS headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.post('/validate', validate({body: json}), (req, res) => {
  // At this point req.body has been validated and you can
  // begin to execute your application code
  res.send('valid');
});

app.use((error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    console.log(error);
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

app.use((error, request, response, next) => {
  // Check the error is a validation error
  
});

app.post('/invoice', async (req, res) => {
  console.log(req.body);
  const pdfFilename = await generatePDF(req.body);
  res.download(pdfFilename);
});

app.listen(3001);