var express = require('express'),
      app = express(),
      pdf = require('express-pdf');
      path = require('path');
      var json = require('./test.json'); //with path
      var validate = require('express-jsonschema').validate;
 
app.use(pdf); // or you can app.use(require('express-pdf'));

app.get('/', (req,res) => {
  console.log("coucou");
  res.send('Got a GET request');
});

app.post('/', (req, res) => {
   //Generation PDF START
    
    res.statusCode = 200

    fonts = {
      Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
      },
      yourFontName: {
        normal: 'arial.ttf',
        bold: 'arialbd.ttf',
        italics: 'ariali.ttf',
        bolditalics: 'arialbi.ttf'
      },
    }

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    
    var docDefinition = {
      content:[
        {
          columns: [
            { text: json.properties.entrepreneurInformations.companyName , fontSize: 15, color : "purple"},
            { text: json.properties.entrepreneurInformations.postalAddress , fontSize: 13, color : "purple" , alignment: 'right'},
          ],
        },
        {
          columns: [
            { text: json.properties.entrepreneurInformations.email , fontSize: 10, color : "purple" },
            { text: json.properties.entrepreneurInformations.department, fontSize: 13, color : "purple" , alignment: 'right'},
          ],
        },
        { text: json.properties.entrepreneurInformations.phoneNumber , fontSize: 10, color : "purple" },
        { text: "SIRET : " + json.properties.entrepreneurInformations.siretNumber , fontSize: 12, color : "purple" , alignment: 'right'},
        "\n\n\n\n\n\n",
        {
          columns: [
            { text: "Numero de Facture" , fontSize: 10, color : "purple" },
            { text: "Date" , fontSize: 10, color : "purple" },
            { text: "Facturé à" , fontSize: 10, color : "purple" , alignment: 'right'},
          ],
        },
        "\n",
        {
          columns: [
            { text: json.properties.billNumber , fontSize: 10.5 },
            { text: json.properties.billDate , fontSize: 10.5 },
            { text: json.properties.clientInformations.clientCompanyName , fontSize: 10.5 , alignment: 'right' , bold: 'Courier-Bold',},
          ],
        },
        "\n",
        { text: json.properties.clientInformations.clientCompanyAddress , fontSize: 10.5 , alignment: 'right'},
        { text: json.properties.clientInformations.department , fontSize: 10.5 , alignment: 'right'},
        "\n\n\n\n\n\n\n\n\n\n",
        {
          columns: [
            { text: "Description" , fontSize: 10,  bold: 'Courier-Bold',},
            { text: "Quantité" , fontSize: 10,   bold: 'Courier-Bold',},
            { text: "Prix unitaire HT" , fontSize: 10, bold: 'TCourierimes-Bold',},
            { text: "Total HT" , fontSize: 10, alignment: 'right', bold: 'Courier-Bold',},
          ],
        },
        {
          image: 'trait.jpg',
        },
        {
          columns: [
            { text: json.properties.prestationsList.description , fontSize: 10,},
            { text: json.properties.prestationsList.quantity , fontSize: 10,},
            { text: "€"+json.properties.prestationsList.unitaryPriceWhithoutTaxes , fontSize: 10,},
            { text: "€"+json.properties.prestationsList.totalPriceWithoutTaxes , fontSize: 10, alignment: 'right',},
          ],
        },
        {
          image: 'trait.jpg',
        },
        "\n\n\n\n\n\n\n\n\n\n\n",
        { text: "Total HT en Euros" , fontSize: 10, alignment: 'right',},
        "\n",
        { text:  "€"+json.properties.totalBill.totalPriceWithoutTaxes, fontSize: 15, alignment: 'right', color : "purple"},
        "\n",
        { text: "TVA non applicable, art. 293 B du CGI" , fontSize: 10, alignment: 'right', italics: 'Courier-Oblique'},
        "\n\n",
        { text: "Date de prestation :" , fontSize: 10, color : "purple"},
        { text:  json.properties.prestationDate, fontSize: 10},
        "\n",
        { text: "Date de paiment :" , fontSize: 10, color : "purple"},
        { text:  json.properties.paimentDate, fontSize: 10},
        "\n\n\n",
        { text: "En cas de retard de paiment, indémnité forfaitaire légale pour frais de recouvrement : 40,00€" , fontSize: 10, italics: 'Courier-Oblique'},
      ],
      defaultStyle: {
        font: 'yourFontName'
      }
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.end();
    //Generation PDF END

    res.pdf(path.resolve(__dirname, './document.pdf')); //PDF display  
  });

  app.post('/street/', validate({body: json}), function(req, res) {
    // At this point req.body has been validated and you can
    // begin to execute your application code
    console.log("valider");
  });

app.listen(3000);