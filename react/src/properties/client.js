import React, { useState } from "react";
import { Input } from 'antd';

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
            <Input
                value={properties["companyName"]}
                onChange={getHandlerForProperty('companyName')}
                type="text"
                placeholder="Client company">
            </Input>
            <Input
                value={properties["address"]["streetAndNumber"]}
                onChange={getHandlerForAddress('streetAndNumber')}
                type="text"
                placeholder="Postal adress">           
            </Input>
            <Input
                value={properties["address"]["postalCode"]}
                onChange={getHandlerForAddress('postalCode')}
                type="integer"
                placeholder="Postal code">                    
            </Input>
            <Input
                value={properties["address"]["city"]}
                onChange={getHandlerForAddress('city')}
                type="integer"
                placeholder="City">
            </Input>
            <Input
                value={properties["address"]["country"]}
                onChange={getHandlerForAddress('country')}
                type="integer"
                placeholder="Country">
            </Input>
        </div>  
      );
    
}

export default Client;