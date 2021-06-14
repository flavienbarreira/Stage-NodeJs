import React from "react";
import { Input, DatePicker } from 'antd';
import './style.less';

const Bill = ({data, onUpdate}) => {

    const getHandlerForProperty = (propertyName) => {
        return (event) => {
            onUpdate({
                ...data,
                [propertyName]: event.target.value
            });
        };
    };

    return (
        <div id="bill">
            <h2> Bill </h2>
            <label>Bill number</label>
            <Input
                value={data.number}
                onChange={getHandlerForProperty('number')}
                type="text"
                placeholder="A34234">
            </Input>
            
            <label>Bill date</label>
            <Input
                value={data.date}
                onChange={getHandlerForProperty('date')}
                type="string"
                placeholder="dd/MM/yyyy">           
            </Input>
        </div>  
      );
}

export default Bill;