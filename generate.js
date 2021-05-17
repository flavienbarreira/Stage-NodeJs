const PdfPrinter = require('pdfmake');
const fs = require('fs');

function generatePDF(json){
fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    },
    arial: {
      normal: 'font/arial/arial.ttf',
      bold: 'font/arial/arialbd.ttf',
      italics: 'font/arial/ariali.ttf',
      bolditalics: 'font/arial/arialbi.ttf'
    },
  }

  var printer = new PdfPrinter(fonts);
  
  var docDefinition = {
    content:[
      {
        columns: [
          { text: json.properties.entrepreneurInformation.companyName , fontSize: 15, color : "purple"},
          { text: json.properties.entrepreneurInformation.postalAddress , fontSize: 13, color : "purple" , alignment: 'right'},
        ],
      },
      {
        columns: [
          { text: json.properties.entrepreneurInformation.email , fontSize: 10, color : "purple" },
          { text: json.properties.entrepreneurInformation.department, fontSize: 13, color : "purple" , alignment: 'right'},
        ],
      },
      { text: json.properties.entrepreneurInformation.phoneNumber , fontSize: 10, color : "purple" },
      { text: "SIRET : " + json.properties.entrepreneurInformation.siretNumber , fontSize: 12, color : "purple" , alignment: 'right'},
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
          { text: json.properties.clientInformation.companyName , fontSize: 10.5 , alignment: 'right' , bold: 'Courier-Bold',},
        ],
      },
      "\n",
      { text: json.properties.clientInformation.companyAddress , fontSize: 10.5 , alignment: 'right'},
      { text: json.properties.clientInformation.department , fontSize: 10.5 , alignment: 'right'},
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
        image: 'design/trait.jpg',
      },
      {
        columns: [
          function (){
            return   'text: json.properties.prestationsList.items[0].description , fontSize: 10,'
          },
          { text: json.properties.prestationsList.items[0].quantity , fontSize: 10,},
          { text: "€"+json.properties.prestationsList.items[0].unitaryPriceWhithoutTaxes , fontSize: 10,},
          { text: "€"+(json.properties.prestationsList.items[0].quantity*json.properties.prestationsList.items[0].unitaryPriceWhithoutTaxes) , fontSize: 10, alignment: 'right',},
        ],
      },
      {
        image: 'design/trait.jpg',
      },
      "\n\n\n\n\n\n\n\n\n\n\n",
      { text: "Total HT en Euros" , fontSize: 10, alignment: 'right',},
      "\n",
      { text:  "€"+(json.properties.prestationsList.items[1]*json.properties.prestationsList.items[2]), fontSize: 15, alignment: 'right', color : "purple"},
      "\n",
      { text: "TVA non applicable, art. 293 B du CGI" , fontSize: 10, alignment: 'right', italics: 'Courier-Oblique'},
      "\n\n",
      { text: "Date de prestation :" , fontSize: 10, color : "purple"},
      { text:  json.properties.prestationDate, fontSize: 10},
      "\n",
      { text: "Date de paiment :" , fontSize: 10, color : "purple"},
      { text:  json.properties.paimentDelay, fontSize: 10},
      "\n\n\n",
      { text: "En cas de retard de paiment, indémnité forfaitaire légale pour frais de recouvrement : 40,00€" , fontSize: 10, italics: 'Courier-Oblique'},
    ],
    defaultStyle: {
      font: 'Helvetica'
    }
  };
  
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('pdf/document.pdf'));
  pdfDoc.end();
}

module.exports = generatePDF;