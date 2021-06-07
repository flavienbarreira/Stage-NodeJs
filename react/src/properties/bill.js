import React, { useState } from "react";
import { Input } from 'antd';

const Bill = () => {

    const [properties, setProperties] = useState({
        number : "",
        date : ""
    });

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            setProperties({
                ...properties,
                [propertyName]: event.target.value
            });
        };
    };

    return (
        <div className="billClass">
            <Input
                value={properties.number}
                onChange={getHandlerForProperty('number')}
                type="text"
                placeholder="Bill Number">
            </Input>
            <Input
                value={properties.date}
                onChange={getHandlerForProperty('date')}
                type="string"
                placeholder="dd/MM/yyyy">           
            </Input>
        </div>  
      );
}

export default Bill;