import React, { useState } from "react";
import { Input } from 'antd';

const Dates = () => {

    const [properties , setProperties] = useState({
        paimentDelay: 0,
        prestationDate : ""
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
        <div className="datesClass">
          <Input
                value={properties["paimentDelay"]}
                onChange={getHandlerForProperty('paimentDelay')}
                type="integer"
                placeholder="Delay for the paiment">
            </Input>
            <Input
                value={properties["prestationDate"]}
                onChange={getHandlerForProperty('prestationDate')}
                type="string"
                placeholder="dd/MM/yyyy">           
            </Input>
        </div>  
      );
    
}

export default Dates;