import React from 'react';

export default function historyOrderItem(props) {
    return (
        <div>
            <p>Date: {props.date}   {props.time}</p>
            <img src={props.img}/>
            <div>
                <p>{props.restaurant_name}</p>
                <p>{props.menu}</p>
            </div>
            <div><p>Origial Price: {props.original_p}   Actual paid: {props.actual_p}</p></div>
            
        </div>
    );
}

