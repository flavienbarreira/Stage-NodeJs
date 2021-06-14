//import React, { useState } from "react";
import * as download from 'downloadjs';

async function askAPI(invoiceData) {
  var body = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/product.schema.json",
    "title": "Bill",
    "description": "A bill for an entrepreneur",
    "type": "object",
    "properties": invoiceData
  };

   /* var body={
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://example.com/product.schema.json",
      "title": "Bill",
      "description": "A bill for an entrepreneur",
      "type": "object",
      "properties": {
        "entrepreneurInformation": {
            "companyName": "FLAVIEN BARREIRA",
            "lastName": "Barreira",
            "firstName": "Alexandre",
            "email": "abarreir@gmail.com",
            "phoneNumber": "06 00 00 00 00",
            "address": {
                "streetAndNumber": "159 rue Jean_Pierre Timbaud",
                "postalCode": "92400",
                "city": "Courbevoie",
                "country": "France"
            },
            "siretNumber": "054654846545646746"
        },
        "bill": {
            "number": "097980985186441",
            "date": "05/05/11"
        },
        "clientInformation": {
            "companyName": "Alexandre BARREIRA",
            "address": {
                "streetAndNumber": "159 rue Beaurepair",
                "postalCode": "75010",
                "city": "Paris",
                "country": "France"
            }
        },
        "prestationsList": {
            "items": [ { "description" :"Audit technique et produit", "quantity" : 2 , "unitaryPriceWhithoutTaxes" : 500 },
            { "description" :"Audit  et produit", "quantity" : 5 , "unitaryPriceWhithoutTaxes" : 65564 }]
        },
        "TVA": {
            "rate": 20,
            "hasTVA": false
        },
        "prestationDateAndDelay": {
            "prestationDate": {
                "day": 5,
                "month": 7,
                "year": 1599
            },
            "paimentDelay": 5
        }
      }
    }*/
    const rawResponse = await fetch('http://localhost:3001/invoice',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const content = await rawResponse.blob();
    download(content);
}

export default askAPI;