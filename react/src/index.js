import React from "react";
import ReactDOM from "react-dom";
import Bill from "./properties/bill";
import Client from "./properties/client";
import Dates from "./properties/dates";
import Entrepreneur from "./properties/entrepreneur";
import TVA from "./properties/TVA.js";
import askAPI from "./askAPI";
import { Button  } from 'antd';
import Prestations from "./properties/prestations";

const App = () => {

  /*const [properties , setProperties] = useState([
    {name : "entrepreneurInformation"},
    {name : "bill"},
    {name : "clientInformation"},
    {name : "prestationsList"},
    {name : "TVA"},
    {name : "prestationDateAndDelay"}
  ])*/

  return (
    <div className="AppClass">
      <form>
        <h2> Bill </h2>
        <Bill />
        <br></br>
        <br></br>
        <h2> Client </h2>
        <Client />
        <br></br>
        <br></br>
        <h2> Dates </h2>
        <Dates />
        <br></br>
        <br></br>
        <h2> TVA </h2>
        <TVA />
        <br></br>
        <br></br>
        <h2> Prestations </h2>
        <Prestations />
        <br></br>
        <br></br>
        <h2> Entrepreneur </h2>
        <Entrepreneur />
      </form>
      <br></br>
      <br></br>
      <Button type="primary" onClick={askAPI}>
        Button
      </Button>
    </div>  
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
