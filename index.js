const { Validator, ValidationError } = require('express-json-validator-middleware');
const express = require('express');
const pdf = require('express-pdf');
const path = require('path');
const json = require('./schema.json'); //with path
const generatePDF = require('./generate.js');
const bodyParser = require('body-parser');
const fs = require('fs');

  
// Prise en charge du JSON.  
const app = express();
app.use(bodyParser.json());


app.use(pdf); // or you can app.use(require('express-pdf'));

var validator = new Validator();
var validate = validator.validate;


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
  const pdfFilename = await generatePDF(req.body);
  res.download(pdfFilename);
});
  //res.pdf(path.resolve(__dirname, './pdf/document.pdf')); //PDF display

app.listen(3000);