import React, { useState } from "react";

const Bill = () => {

    const [properties , setProperties] = useState([
        {number : ""},
        {
            date : {
              day : 0,
              month : 0,
              year: 0
            }
        }
    ]);

    const handleChange = (event) => {
        setProperties([
            {number : event.currentTarget.value},
            {
                date : {
                  day : event.currentTarget.value,
                  month : event.currentTarget.value,
                  year: event.currentTarget.value
                }
            }
        ]);
    };

    return (
        <div className="billClass">
          <input
                value={properties["number"]}
                onChange={handleChange}
                type="text"
                placeholder="Bill Number">
            </input>
            <input
                value={properties["date"].day}
                onChange={handleChange}
                type="integer"
                placeholder="dd">           
            </input>
            <input
                value={properties["date"].month}
                onChange={handleChange}
                type="integer"
                placeholder="MM">                    
            </input>
            <input
                value={properties["date"].year}
                onChange={handleChange}
                type="integer"
                placeholder="yyyy">
            </input>
        </div>  
      );
    
}

export default Bill;