var express = require('express'),
        app = express(),
        pdf = require('express-pdf');
        path = require('path');
 
//previously app.use(pdf())
app.use(pdf); // or you can app.use(require('express-pdf'));

app.get('/invoice/:firstname/:lastname', (req, res) => {
    res.statusCode = 200
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    
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
        "Hello " + firstname + " " + lastname,
      ],
      defaultStyle: {
        font: 'Times'
      }
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.end();

    res.pdf(path.resolve(__dirname, './document.pdf'));
  });

app.listen(3000);