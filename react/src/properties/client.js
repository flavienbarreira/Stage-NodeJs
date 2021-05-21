import React, { useState } from "react";

const Client = () => {

    const [properties , setProperties] = useState([
        {companyName: ""},
        {
            address : {
                streetAndNumber : "",
                postalCode : 0,
                city : "",
                country : ""
            }
        }
    ]);

    const handleChange = (event) => {
        setProperties([
            {companyName: event.currentTarget.value},
            {
                address : {
                    streetAndNumber : event.currentTarget.value,
                    postalCode : event.currentTarget.value,
                    city : event.currentTarget.value,
                    country : event.currentTarget.value
                }
            }
        ]);
    };

    return (
        <div className="clientClass">
          <input
                value={properties["companyName"]}
                onChange={handleChange}
                type="text"
                placeholder="Client company">
            </input>
            <input
                value={properties["address"].streetAndNumber}
                onChange={handleChange}
                type="text"
                placeholder="Postal adress">           
            </input>
            <input
                value={properties["address"].postalCode}
                onChange={handleChange}
                type="integer"
                placeholder="Postal code">                    
            </input>
            <input
                value={properties["address"].city}
                onChange={handleChange}
                type="integer"
                placeholder="City">
            </input>
            <input
                value={properties["address"].country}
                onChange={handleChange}
                type="integer"
                placeholder="Country">
            </input>
        </div>  
      );
    
}

export default Client;