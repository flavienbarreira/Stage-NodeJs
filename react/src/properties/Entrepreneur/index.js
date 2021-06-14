import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const Entrepreneur = ({data, onUpdate}) => {

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
        <div className="entrepreneurClass">
            <Input
                value={data.companyName}
                placeholder="default size"
                prefix={<UserOutlined />}
                onChange={getHandlerForProperty('companyName')}
                type="text"/>
            <Input
                value={data.email}
                onChange={getHandlerForProperty('email')}
                type="text"
                placeholder="email">
            </Input>
            <Input
                value={data.phoneNumber}
                onChange={getHandlerForProperty('phoneNumber')}
                type="text"
                placeholder="tel.">
            </Input>
            <Input
                value={data.address.streetAndNumber}
                onChange={getHandlerForAddress('streetAndNumber')}
                type="text"
                placeholder="Postal address">           
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
            <Input
                value={data.siretNumber}
                onChange={getHandlerForProperty('siretNumber')}
                type="integer"
                placeholder="Siret number">
            </Input>
        </div>  
      );
    
}

export default Entrepreneur;