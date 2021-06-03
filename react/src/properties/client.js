import React, { useState } from "react";

const Client = () => {

    const [properties , setProperties] = useState({
        companyName: "",
        address : {
            streetAndNumber : "",
            postalCode : 0,
            city : "",
            country : ""
        }
    });

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            setProperties({
                ...properties,
                [propertyName]: event.target.value
            });
        };
    };

    const getHandlerForAddress = (propertyName) => {
        return (event) => {
            setProperties({
                ...properties,
                address: {
                    ...properties.address,
                    [propertyName]: event.target.value,
                }
            });
        };
    };

    return (
        <div className="clientClass">
            <input
                value={properties["companyName"]}
                onChange={getHandlerForProperty('companyName')}
                type="text"
                placeholder="Client company">
            </input>
            <input
                value={properties["address"]["streetAndNumber"]}
                onChange={getHandlerForAddress('streetAndNumber')}
                type="text"
                placeholder="Postal adress">           
            </input>
            <input
                value={properties["address"]["postalCode"]}
                onChange={getHandlerForAddress('postalCode')}
                type="integer"
                placeholder="Postal code">                    
            </input>
            <input
                value={properties["address"]["city"]}
                onChange={getHandlerForAddress('city')}
                type="integer"
                placeholder="City">
            </input>
            <input
                value={properties["address"]["country"]}
                onChange={getHandlerForAddress('country')}
                type="integer"
                placeholder="Country">
            </input>
        </div>  
      );
    
}

export default Client;