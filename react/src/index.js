import React, { useState } from "react";
import ReactDOM from "react-dom";
import Bill from "./properties/bill";
import Client from "./properties/client";
import Dates from "./properties/dates";
import Entrepreneur from "./properties/entrepreneur";
import PrestationsList from "./properties/prestations";
import TVA from "./properties/TVA.js";
import askAPI from "./askAPI";
import { Button } from 'antd';

const App = () => {

  const [properties , setProperties] = useState([
    {name : "entrepreneurInformation"},
    {name : "bill"},
    {name : "clientInformation"},
    {name : "prestationsList"},
    {name : "TVA"},
    {name : "prestationDateAndDelay"}
  ])

  const title = "Formulaire";

  return (
    <div className="App">
      <form>
        <Entrepreneur />
        <Bill />
        <Client />
        <prestationsList />
        <TVA />
        <Dates />
      </form>
      <Button type="primary" onClick={askAPI}>
        Button
      </Button>
    </div>  
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
