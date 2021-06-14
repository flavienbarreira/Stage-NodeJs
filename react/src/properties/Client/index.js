import React from "react";
import { Input } from 'antd';

const Client = ({data, onUpdate}) => {

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            onUpdate({
                ...data,
                [propertyName]: event.target.value
            });
        };
    };

    const getHandlerForAddress = (propertyName) => {
        return (event) => {
            onUpdate({
                ...data,
                address: {
                    ...data.address,
                    [propertyName]: event.target.value,
                }
            });
        };
    };

    return (
        <div className="clientClass">
            <Input
                value={data.companyName}
                onChange={getHandlerForProperty('companyName')}
                type="text"
                placeholder="Client company">
            </Input>
            <Input
                value={data.address.streetAndNumber}
                onChange={getHandlerForAddress('streetAndNumber')}
                type="text"
                placeholder="Postal adress">           
            </Input>
            <Input
                value={data.address.postalCode}
                onChange={getHandlerForAddress('postalCode')}
                type="integer"
                placeholder="Postal code">                    
            </Input>
            <Input
                value={data.address.city}
                onChange={getHandlerForAddress('city')}
                type="integer"
                placeholder="City">
            </Input>
            <Input
                value={data.address.country}
                onChange={getHandlerForAddress('country')}
                type="integer"
                placeholder="Country">
            </Input>
        </div>  
      );
    
}

export default Client;