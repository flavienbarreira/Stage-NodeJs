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

/*const Item = ({ item , idx , size }) => {
    if(idx===0){
        return (
            <div>
                <div>{item["description"]}</div>
                <div>{item["quantity"]}</div>
                <div>{item["unitaryPriceWhithoutTaxes"]}</div>
            </div>
        );
    } else if(idx===size-1){
        return (
            <div>
                <div>{item["description"]}</div>
                <div>{item["quantity"]}</div>
                <div>{item["unitaryPriceWhithoutTaxes"]}</div>
            </div>
        );
    } else {
        return (
            <div>
                <div>{item["description"]}</div>
                <div>{item["quantity"]}</div>
                <div>{item["unitaryPriceWhithoutTaxes"]}</div>
            </div>
        );
    }   
}*/

const CreateTable = ({ items }) => {
    /*const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];*/
      
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

/*{items.map((item , idx) => {
    return <Item item={item} key={idx} size={items.length} />
})}*/

const ItemsList = ({ items }) => {

    if (!items) return 'no items';
    return (
        <div>
            <CreateTable items={items}/>
        </div>
    );
}

const Prestations = () => {

    const [items, setItems] = useState([]);

    const onItemAdded = (item) => {
        let x = items.length;
        item["key"] = x;
        setItems([
            ...items,
            item
        ]);
    }

    console.log(items);

    return (
        <div className="prestationsClass">
            <AddItemForm onItemAdded={onItemAdded}/>
            <ItemsList items={items} />
        </div>
      );
    
}

export default Prestations;