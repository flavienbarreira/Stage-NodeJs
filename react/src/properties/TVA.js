import React, { useState } from "react";

const TVA = () => {

    const [properties , setProperties] = useState([
        {rate : 0},
        {hasTVA : false}
    ]);

    const handleChange = (event) => {
        setProperties([
            {rate : event.currentTarget.value},
            {hasTVA : event.currentTarget.value}
        ]);
    };

    return (
        <div className="TVAClass">
          <input
                value={properties["rate"]}
                onChange={handleChange}
                type="float"
                placeholder="Rate in percent">
            </input>
            <input
                value={properties["hasTVA"]}
                onChange={handleChange}
                type="boolean"
                placeholder="Tva or not">           
            </input>
        </div>  
      );
    
}

export default TVA;