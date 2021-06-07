import React, { useState } from "react";
import { Input } from 'antd';

const TVA = () => {

    const [properties , setProperties] = useState({
        rate : 0,
        hasTVA : false
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
        <div className="TVAClass">
          <Input
                value={properties["rate"]}
                onChange={getHandlerForProperty('rate')}
                type="float"
                placeholder="Rate in percent">
            </Input>
            <Input
                value={properties["hasTVA"]}
                onChange={getHandlerForProperty('hasTVA')}
                type="boolean"
                placeholder="Tva or not">           
            </Input>
        </div>  
      );
    
}

export default TVA;