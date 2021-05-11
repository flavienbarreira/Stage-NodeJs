var express = require('express'),
        app = express(),
        pdf = require('express-pdf');
        path = require('path');
        var json = require('./test.json'); //with path
 
app.use(pdf); // or you can app.use(require('express-pdf'));

app.get('/', (req,res) => {
  console.log("coucou");
  res.send('Got a GET request');
});

app.post('/', (req, res) => {
  //res.send('Got a POST request');
   //Generation PDF START
    res.statusCode = 200
    var fonts = {
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      },
    };
    
    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    
    var docDefinition = {
      content: [
        "Entrepreneur informations : "  + " " + json.properties.entrepreneurInformations.firstName,
        "Campany Name : " + json.properties.entrepreneurInformations.companyName,
        "First Name : " + json.properties.entrepreneurInformations.firstName,
        "Last Name : " + json.properties.entrepreneurInformations.lastName
      ],
      defaultStyle: {
        font: 'Times'
      }
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.end();
    //Generation PDF END

    res.pdf(path.resolve(__dirname, './document.pdf')); //PDF display

    //
    //console.log(json.properties.companyInformations.companyName);    
  });


app.listen(3000);