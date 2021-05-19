const PdfPrinter = require('pdfmake');
const fs = require('fs');

function buildPrestationsTable(items , TVArate) {
  let total=0;
  let total2;
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
        {text: items[i].unitaryPriceWhithoutTaxes + " €",  fontSize: 10,},
        {text: (items[i].quantity*items[i].unitaryPriceWhithoutTaxes) + " €" , fontSize: 10, alignment: 'right',}
      ],
    });
    total += items[i].quantity*items[i].unitaryPriceWhithoutTaxes;
    tab.push({image: 'design/trait.jpg',margin: [ 0, 2, 0, 2 ]});
  }
  total2 = total + total*(TVArate/100);
  tab.push({
    columns : [
      {text: "Total" ,  fontSize: 10, color : "purple"},
      {text: total + " €", fontSize: 10, alignment: 'right', color : "purple"}
    ],
  });
  return tab;
}

function buildHeader(entrepreneurInformation) {
  const tab = [{
      columns: [
        { text: entrepreneurInformation.companyName , fontSize: 15, color : "purple"},
        { text: entrepreneurInformation.address.streetAndNumber , fontSize: 13, color : "purple" , alignment: 'right' , margin: [ 0, 0, 0, 4 ]}
      ],
    },
  ];
  tab.push({
      columns: [
        { text: entrepreneurInformation.email , fontSize: 10, color : "purple" , margin: [ 0, 1, 0, 4 ] },
        { text: entrepreneurInformation.address.postalCode + " " + entrepreneurInformation.address.city, fontSize: 13, color : "purple" , alignment: 'right' , margin: [ 0, 1, 0, 4 ]}
      ],
    }
  );
  tab.push({
    columns: [
      { text: entrepreneurInformation.phoneNumber , fontSize: 10, color : "purple" },
      { text: entrepreneurInformation.address.country, fontSize: 13, color : "purple" , alignment: 'right' , margin: [ 0, 1, 0, 4 ]}
    ],
  }
);
  tab.push({ text: "SIRET : " + entrepreneurInformation.siretNumber , fontSize: 12, color : "purple" , alignment: 'right', margin: [ 0, 10, 0, 0 ]})
  return tab;
}

function buildInfos(properties) {
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
    { text: properties.clientInformation.address.streetAndNumber , fontSize: 10.5 , alignment: 'right', margin: [ 0, 0, 0, 4 ]},
    { text: properties.clientInformation.address.postalCode + " " + properties.clientInformation.address.city , fontSize: 10.5 , alignment: 'right' , margin: [ 0, 1, 0, 4 ]},
    { text: properties.clientInformation.address.country , fontSize: 10.5 , alignment: 'right'}
  );
  return tab;
}

function calculateTotal(items, TVArate , hasTVA) {
  tab=[];
  let total = 0;
  let tot =0;
  for (let i = 0; i<items.length; i++) {
    tot += items[i].quantity*items[i].unitaryPriceWhithoutTaxes;
  }
  total = tot + tot*(TVArate/100);
  if(hasTVA==true){
    tab.push({text: "Total TTC en Euros" , fontSize: 10, alignment: 'right'});
    tab.push({ text:  total+ " €", fontSize: 15, alignment: 'right', color : "purple" , margin: [ 0, 10, 0, 0 ]});
  } else {
    tab.push({ text: "Total HT en Euros" , fontSize: 10, alignment: 'right'});
    tab.push({ text:  tot+ " €", fontSize: 15, alignment: 'right', color : "purple" , margin: [ 0, 10, 0, 10 ]});
    tab.push({text: "TVA non applicable, art. 293 B du CGI" , fontSize: 10, alignment: 'right', italics: 'Courier-Oblique'});
  }
  return tab;
}

function buildDates(prestationDate, paimentDelay) {
  let paimentDate = prestationDate;
  let day = prestationDate[0] +  prestationDate[1];
  let month = prestationDate[3] +  prestationDate[4];
  let year = prestationDate[6] +  prestationDate[7];
  let finalDate="";
  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

  //check if need to increment the month or year
 
  if(month==2 && (day+paimentDelay)>28){
    month++;
    day = (day+paimentDelay)-28;
    } else if((day+paimentDelay)>31){
      if((month+1)>12){
        year++;
        month = 1;
      } else {
        month++;
      }
      day = (day+paimentDelay)-31;
    } else {
      day += paimentDelay;
    }

  //recreate the string
  if(day<10){
    day = "0"+day.toString();
  } else {
    day = day.toString();
  }
  if(month<10){
    month = "0"+month.toString();
  } else {
    month = month.toString();
  }
  year = year.toString();

  //final string
  finalDate = day + "/" + month + "/" + year;

  const tab=[{ text: "Date de prestation :" , fontSize: 10, color : "purple",  margin: [ 0, 0, 0, 4 ]}];
  tab.push({ text:  prestationDate, fontSize: 10});
  tab.push( { text: "Date de paiment :" , fontSize: 10, color : "purple", margin: [ 0, 10, 0, 4 ]});
  tab.push({ text:  finalDate, fontSize: 10});
  tab.push({ text: "En cas de retard de paiment, indémnité forfaitaire légale pour frais de recouvrement : 40,00€" , fontSize: 10, italics: 'Courier-Oblique',  margin: [ 0, 30, 0, 0 ]});
  return tab;
}

function generatePDF(json) {
  const prestationsTable = buildPrestationsTable(json.properties.prestationsList.items , json.properties.TVArate);
  const header = buildHeader(json.properties.entrepreneurInformation);
  const infos = buildInfos(json.properties);
  const total = calculateTotal(json.properties.prestationsList.items, json.properties.TVArate, json.properties.hasTVA);
  const date = buildDates(json.properties.prestationDate, json.properties.paimentDelay);

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
    content: [
      header,
      "\n\n\n\n\n\n",
      infos,
      "\n\n\n\n\n\n\n\n\n\n",
      prestationsTable,
      "\n\n\n\n\n\n\n\n\n\n\n",
      total,
      "\n\n",
      date,
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