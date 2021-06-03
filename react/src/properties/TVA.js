import React, { useState } from "react";

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
          <input
                value={properties["rate"]}
                onChange={getHandlerForProperty('rate')}
                type="float"
                placeholder="Rate in percent">
            </input>
            <input
                value={properties["hasTVA"]}
                onChange={getHandlerForProperty('hasTVA')}
                type="boolean"
                placeholder="Tva or not">           
            </input>
        </div>  
      );
    
}

export default TVA;