import React, { useState } from "react";
import { Input } from 'antd';

const Dates = ({data, onUpdate}) => {

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            onUpdate({
                ...data,
                [propertyName]: event.target.value
            });
        };
    };

    return (
        <div className="datesClass">
          <Input
                value={data.paimentDelay}
                onChange={getHandlerForProperty('paimentDelay')}
                type="integer"
                placeholder="Delay for the paiment">
            </Input>
            <Input
                value={data.prestationDate}
                onChange={getHandlerForProperty('prestationDate')}
                type="string"
                placeholder="dd/MM/yyyy">           
            </Input>
        </div>  
      );
    
}

export default Dates;