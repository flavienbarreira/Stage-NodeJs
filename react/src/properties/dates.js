import React, { useState } from "react";

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
          <input
                value={properties["paimentDelay"]}
                onChange={getHandlerForProperty('paimentDelay')}
                type="integer"
                placeholder="Delay for the paiment">
            </input>
            <input
                value={properties["prestationDate"]}
                onChange={getHandlerForProperty('prestationDate')}
                type="string"
                placeholder="dd/MM/yyyy">           
            </input>
        </div>  
      );
    
}

export default Dates;