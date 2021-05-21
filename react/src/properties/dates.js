import React, { useState } from "react";

const Dates = () => {

    const [properties , setProperties] = useState([
        {paimentDelay: 0},
        {
            prestationDate : {
                day : 0,
                month : 0,
                year: 0
              }
        }
    ]);

    const handleChange = (event) => {
        setProperties([
            {paimentDelay: event.currentTarget.value},
            {
                prestationDate : {
                    day : event.currentTarget.value,
                    month : event.currentTarget.value,
                    year: event.currentTarget.value
                  }
            }
        ]);
    };

    return (
        <div className="datesClass">
          <input
                value={properties["paimentDelay"]}
                onChange={handleChange}
                type="integer"
                placeholder="Delay for the paiment">
            </input>
            <input
                value={properties["prestationDate"].day}
                onChange={handleChange}
                type="integer"
                placeholder="dd">           
            </input>
            <input
                value={properties["prestationDate"].month}
                onChange={handleChange}
                type="integer"
                placeholder="MM">                    
            </input>
            <input
                value={properties["prestationDate"].year}
                onChange={handleChange}
                type="integer"
                placeholder="yyyy">
            </input>
        </div>  
      );
    
}

export default Dates;