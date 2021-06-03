import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

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
        },  
        siretNumber: 0
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
        <div className="entrepreneurClass">
            <Input
                value={properties["companyName"]}
                placeholder="default size"
                prefix={<UserOutlined />}
                onChange={getHandlerForProperty('companyName')}
                type="text"/>
            <Input
                value={properties["email"]}
                onChange={getHandlerForProperty('email')}
                type="text"
                placeholder="email">
            </Input>
            <Input
                value={properties["phoneNumber"]}
                onChange={getHandlerForProperty('phoneNumber')}
                type="text"
                placeholder="tel.">
            </Input>
            <Input
                value={properties["address"]["streetAndNumber"]}
                onChange={getHandlerForAddress('streetAndNumber')}
                type="text"
                placeholder="Postal address">           
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
            <Input
                value={properties["siretNumber"]}
                onChange={getHandlerForProperty('siretNumber')}
                type="integer"
                placeholder="Siret number">
            </Input>
        </div>  
      );
    
}

export default Entrepreneur;