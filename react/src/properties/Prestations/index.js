import React, { useState } from "react";
import { Button , Table , Input} from 'antd';

const AddItemForm = ({ onItemAdded }) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitaryPriceWhithoutTaxes, setUnitaryPriceWithoutTaxes] = useState(0);
    const onAddPrestation = () => {
        onItemAdded({ description, quantity, unitaryPriceWhithoutTaxes });
    };

    const handleChangeDescription = (event) => {
        var value = event.target.value;
        setDescription(value);
    }

    const handleChangeQuantity = (event) => {
        var value = event.target.value;
        setQuantity(value);
    }

    const handleChangeUnitaryPriceWhithoutTaxes = (event) => {
        var value = event.target.value;
        setUnitaryPriceWithoutTaxes(value);
    }

    return (
        <div>
            <Input onChange={handleChangeDescription}></Input>
            <Input onChange={handleChangeQuantity}></Input>
            <Input onChange={handleChangeUnitaryPriceWhithoutTaxes}></Input> 
            <Button onClick={onAddPrestation}>Ajouter une prestation</Button>
        </div>
    )
}

const CreateTable = ({ items }) => {
      
    const columns = [
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'UnitaryPriceWhithoutTaxes',
          dataIndex: 'unitaryPriceWhithoutTaxes',
          key: 'unitaryPriceWhithoutTaxes',
        },
      ];
      
    return <Table dataSource={items} columns={columns} />;
}

const ItemsList = ({ items }) => {

    if (!items) return 'no items';
    return (
        <div>
            <CreateTable items={items}/>
        </div>
    );
}

const Prestations = ({data, onUpdate}) => {

    const onItemAdded = (item) => {
        let x = data.length;
        item["key"] = x;
        onUpdate([
            ...data,
            item
        ]);
    }


    return (
        <div className="prestationsClass">
            <AddItemForm onItemAdded={onItemAdded}/>
            <ItemsList items={data} />
        </div>
      );
    
}

export default Prestations;