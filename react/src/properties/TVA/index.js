import React, { useState } from "react";
import { Input } from 'antd';

const TVA = ({data, onUpdate}) => {

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            onUpdate({
                ...data,
                [propertyName]: event.target.value
            });
        };
    };

    return (
        <div className="TVAClass">
          <Input
                value={data.rate}
                onChange={getHandlerForProperty('rate')}
                type="float"
                placeholder="Rate in percent">
            </Input>
            <Input
                value={data.hasTVA}
                onChange={getHandlerForProperty('hasTVA')}
                type="boolean"
                placeholder="Tva or not">           
            </Input>
        </div>  
      );
    
}

export default TVA;