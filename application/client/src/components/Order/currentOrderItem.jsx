import React from 'react';

export default function CurrentOrderItem(props) {
    return (
        <div>
            <p>Restaurant: {props.restaurant_name}</p>
            <p>Total price: {props.price}</p>
            <p>Menu List:</p>
            {props.foods.map((food)=>(
                <p>{food.name}- {food.price}</p>
            ))}
            <p>Date: {props.date}</p>
            <p>Status: {props.status}</p>
            
        </div>
    );
}



