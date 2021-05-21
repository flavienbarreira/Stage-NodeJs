import React, { useState } from "react";

const Entrepreneur = () => {

    const [properties , setProperties] = useState({
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
            }
        ,  
        siretNumber: 0
    });

    setProperties({
        ...properties,
        email: "test.com",
    });

    const handleChange = (event) => {
        setProperties([
            {companyName: event.currentTarget.value},
            {lastName: event.currentTarget.value},
            {firstName: event.currentTarget.value},
            {email: event.currentTarget.value},
            {phoneNumber: event.currentTarget.value},
            {
                address : {
                    streetAndNumber : event.currentTarget.value,
                    postalCode : event.currentTarget.value,
                    city : event.currentTarget.value,
                    country : event.currentTarget.value
                }
            },  
            {siretNumber: event.currentTarget.value}
        ]);
    };

    return (
        <div className="entrepreneurClass">
          <input
                value={properties["companyName"]}
                onChange={handleChange}
                type="text"
                placeholder="Entrepreneur company">
            </input>
            <input
                value={properties["email"]}
                onChange={handleChange}
                type="text"
                placeholder="email">
            </input>
            <input
                value={properties["phoneNumber"]}
                onChange={handleChange}
                type="text"
                placeholder="tel.">
            </input>
            <input
                value={properties["address"].streetAndNumber}
                onChange={handleChange}
                type="text"
                placeholder="Postal address">           
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
            <input
                value={properties["siretNumber"]}
                onChange={handleChange}
                type="integer"
                placeholder="Siret number">
            </input>
        </div>  
      );
    
}

export default Entrepreneur;