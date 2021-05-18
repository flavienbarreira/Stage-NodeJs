const PdfPrinter = require('pdfmake');
const fs = require('fs');

function buildPrestationsTable(items) {
  const tab = [{
      columns: [
        { text: "Description" , fontSize: 10,  bold: 'Courier-Bold',},
        { text: "Quantité" , fontSize: 10,   bold: 'Courier-Bold',},
        { text: "Prix unitaire HT" , fontSize: 10, bold: 'TCourierimes-Bold',},
        { text: "Total HT" , fontSize: 10, alignment: 'right', bold: 'Courier-Bold',},
      ],
    },
  ];
  tab.push({image: 'design/trait.jpg',margin: [ 0, 2, 0, 2 ]});
  for (let i = 0; i<items.length; i++) {
    tab.push({
      columns : [
        {text: items[i].description ,  fontSize: 10,},
        {text: items[i].quantity,  fontSize: 10,},
        {text: "€"+items[i].unitaryPriceWhithoutTaxes,  fontSize: 10,},
        {text: "€"+(items[i].quantity*items[i].unitaryPriceWhithoutTaxes) , fontSize: 10, alignment: 'right',}
      ],
    });
    tab.push({image: 'design/trait.jpg',margin: [ 0, 2, 0, 2 ]});
  }
  return tab;
}

function buildHeader(entrepreneurInformation){
  const tab = [{
      columns: [
        { text: entrepreneurInformation.companyName , fontSize: 15, color : "purple"},
        { text: entrepreneurInformation.postalAddress , fontSize: 13, color : "purple" , alignment: 'right', margin: [ 0, 0, 0, 4 ]},
      ],
    },
  ];
  tab.push({
      columns: [
        { text: entrepreneurInformation.email , fontSize: 10, color : "purple" , margin: [ 0, 1, 0, 4 ] },
        { text: entrepreneurInformation.department, fontSize: 13, color : "purple" , alignment: 'right'},
      ],
    }
  );
  return tab;
}

function buildInfos(properties){
  const tab = [{
      columns: [
        { text: "Numero de Facture" , fontSize: 10, color : "purple" ,margin: [ 0, 0, 0, 8 ]},
        { text: "Date" , fontSize: 10, color : "purple" , margin: [ 0, 0, 0, 8 ]},
        { text: "Facturé à" , fontSize: 10, color : "purple" , alignment: 'right', margin: [ 0, 0, 0, 8 ]},
      ],
    },
  ];
  tab.push({
      columns: [
        { text: properties.billNumber , fontSize: 10.5 },
        { text: properties.billDate , fontSize: 10.5 },
        { text: properties.clientInformation.companyName , fontSize: 10.5 , alignment: 'right' , bold: 'Courier-Bold', margin: [ 0, 0, 0, 8 ]},
      ],
    },
  );
  tab.push(
    { text: properties.clientInformation.companyAddress , fontSize: 10.5 , alignment: 'right', margin: [ 0, 0, 0, 4 ]},
    { text: properties.clientInformation.department , fontSize: 10.5 , alignment: 'right'},
  );
  return tab;
}

function generatePDF(json){
  const prestationsTable = buildPrestationsTable(json.properties.prestationsList.items);
  const header = buildHeader(json.properties.entrepreneurInformation);
  const infos = buildInfos(json.properties);
  const tva = [];
  const tva2 = [];
  let total=0;
  if(json.properties.hasTVA==true){
    total += total*(json.properties.TVArate/100);
    tva.push(
      {text: "Total TTC en Euros" , fontSize: 10, alignment: 'right'},
    );
  } else {
    tva.push(
      {text: "Total HT en Euros" , fontSize: 10, alignment: 'right'},
    );
    tva2.push(
      {text: "TVA non applicable, art. 293 B du CGI" , fontSize: 10, alignment: 'right', italics: 'Courier-Oblique'},
    );
  }

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
      header,
      { text: json.properties.entrepreneurInformation.phoneNumber , fontSize: 10, color : "purple" },
      { text: "SIRET : " + json.properties.entrepreneurInformation.siretNumber , fontSize: 12, color : "purple" , alignment: 'right'},
      "\n\n\n\n\n\n",
      infos,
      "\n\n\n\n\n\n\n\n\n\n",
      prestationsTable,
      "\n\n\n\n\n\n\n\n\n\n\n",
      tva,
      "\n",
      { text:  "€"+total, fontSize: 15, alignment: 'right', color : "purple"},
      "\n",
      tva2,
      "\n\n",
      { text: "Date de prestation :" , fontSize: 10, color : "purple",  margin: [ 0, 0, 0, 4 ]},
      { text:  json.properties.prestationDate, fontSize: 10},
      "\n",
      { text: "Date de paiment :" , fontSize: 10, color : "purple", margin: [ 0, 0, 0, 4 ]},
      { text:  json.properties.paimentDelay, fontSize: 10},
      "\n\n\n",
      { text: "En cas de retard de paiment, indémnité forfaitaire légale pour frais de recouvrement : 40,00€" , fontSize: 10, italics: 'Courier-Oblique'},
    ],
    defaultStyle: {
      font: 'Helvetica'
    }
  };
  
  return new Promise((resolve, reject) => {
    const filename = `pdf/document-${Math.random()*100000}.pdf`;
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const stream = fs.createWriteStream(filename);

    stream.on('finish', () => {
      return resolve(filename);
    });
    stream.on('error', reject);

    pdfDoc.pipe(stream);
    pdfDoc.end();
  });
}

module.exports = generatePDF;