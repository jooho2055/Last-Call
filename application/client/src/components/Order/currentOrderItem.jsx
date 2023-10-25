import React from 'react';

export default function CurrentOrderItem(props) {
    return (
        <div>
            <p>Restaurant: {props.restaurant_name}</p>
            <p>Address: {props.address}</p>
            <p>Menu List:</p>
            {props.foods.map((food)=>(
                <li>{food.name}- {food.quantity}- {food.price}</li>
            ))}
            <p>Total price: {props.price}</p>
            <p>Date: {props.date}</p>
            <p>Pick up by: {props.time}</p>
            <p>Status: {props.status}</p>
            
            
        </div>
    );
}



