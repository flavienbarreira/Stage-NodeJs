import React, {useState} from "react";
import ReactDOM from "react-dom";
import Bill from "./properties/Bill";
import Client from "./properties/Client";
import Dates from "./properties/Dates";
import Entrepreneur from "./properties/Entrepreneur";
import TVA from "./properties/TVA/index.js";
import askAPI from "./askAPI";
import { Button  } from 'antd';
import Prestations from "./properties/Prestations";
import 'antd/dist/antd.less';
import './index.less';

const App = () => {
  const [billData, setBillData] = useState({
    number : "",
    date : ""
  });

  const [clientData , setClientData] = useState({
    companyName: "",
    address : {
        streetAndNumber : "",
        postalCode : 0,
        city : "",
        country : ""
    }
  });

  const [datesData , setDatesData] = useState({
    paimentDelay: 0,
    prestationDate : ""
  });

  const [entrepreneurData , setEntrepreneurData] = useState({
    companyName: "",
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    address : {
        streetAndNumber : "",
        postalCode : 0,
        city : "",
        country : ""
    },  
    siretNumber: 0
  });

  const [TVAData , setTVAData] = useState({
    rate : 0,
    hasTVA : false
  });

  const [prestationsData, setPrestationsData] = useState([]);

  const generateInvoice = () => {
    askAPI({
      bill: billData,
      clientInformation : clientData,
      prestationDateAndDelay : datesData,
      entrepreneurInformation : entrepreneurData,
      prestationsList : {items: prestationsData},
      TVA : TVAData,
    })
  }

  return (
    <div className="AppClass">
      <form>
        <Bill data={billData} onUpdate={setBillData}/>
        <br></br>
        <br></br>
        <h2> Client </h2>
        <Client data={clientData} onUpdate={setClientData}/>
        <br></br>
        <br></br>
        <h2> Dates </h2>
        <Dates data={datesData} onUpdate={setDatesData}/>
        <br></br>
        <br></br>
        <h2> TVA </h2>
        <TVA data={TVAData} onUpdate={setTVAData}/>
        <br></br>
        <br></br>
        <h2> Prestations </h2>
        <Prestations data={prestationsData} onUpdate={setPrestationsData}/>
        <br></br>
        <br></br>
        <h2> Entrepreneur </h2>
        <Entrepreneur data={entrepreneurData} onUpdate={setEntrepreneurData}/>
      </form>
      <br></br>
      <br></br>
      <Button type="primary" onClick={generateInvoice}>
        Button
      </Button>
    </div>  
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
