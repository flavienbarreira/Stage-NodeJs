import React, { useState } from "react";

const createEmptyItem = () => {
    return {
        description: '',
        quantity : 0,
        unitaryPriceWhithoutTaxes: 0
    };
}

const AddItemForm = ({onItemAdded}) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitaryPriceWhithoutTaxes, setUnitaryPriceWithoutTaxes] = useState(0);

    const onAddPrestation = () => {
        onItemAdded({ description, quantity, unitaryPriceWhithoutTaxes });
    };

    return (
        <div>
            <input onChange={setDescription}></input>
            <input onChange={setQuantity}></input>
            <input onChange={setUnitaryPriceWithoutTaxes}></input>
            
            <Button onClick={onAddPrestation}>Ajouter une prestation</Button>
        </div>
    )
}

const Item = (item) => {
    return (
        <div>
            <div>{item.description}</div>
            <div>{item.quantity}</div>
            <div>{item.unitaryPriceWhithoutTaxes}</div>
        </div>
    );
}

const ItemsList = (items) => {
    return (
        <div>
            {items.map((item) => {
                <Item item={item} />
            })}
        </div>
    );
}

const Prestations = () => {

    const [items, setItems] = useState([]);

    const handleChange = (event) => {
        setProperties([{
            items : [ {
                    description : event.currentTarget.value,
                    quantity : event.currentTarget.value,
                    unitaryPriceWhithoutTaxes: event.currentTarget.value
                }
            ]
        }
    ]);
    };

    const onAddPrestation = () => {
        setItems([
            ...items,
            createEmptyItem()
        ]);
    };

    const onItemAdded = (item) => {
        setItems([
            ...items,
            item
        ]);
    }

    return (
        <div className="prestationsClass">
            <ItemsList items={items} />
            <AddItemForm onItemAdded={onItemAdded}/>
        </div>  
      );
    
}

export default Prestations;