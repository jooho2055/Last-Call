import React from 'react';

export default function HistoryOrderItem(props) {
    return (
        <div>
            <p>Date: {props.date}   {props.time}</p>
            <div>
                <p>Restaurant: {props.restaurant_name}</p>
                <p>Address: {props.address}</p>
                <p>Menu List:</p>
               {props.foods.map((food)=>(
                   <li>{food.name}- {food.quantity}- {food.price}</li>
               ))}
            </div>
            <div><p>Origial Price: {props.original_p}   Actual paid: {props.actual_p}</p></div>
         <br />   
        </div>
    );
}

