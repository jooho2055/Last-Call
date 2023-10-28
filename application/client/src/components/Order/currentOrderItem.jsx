import React from 'react';

export default function CurrentOrderItem(props) {
    return (
        <div className='border border-slate-600 relative w-72 h-80'>
            <p>Restaurant: {props.restaurant_name}</p>
            <p>Address: {props.address}</p>
            <p>Date: {props.date}</p>
            <p>Pick up by: {props.time}</p>
            <p>Status: {props.status}</p>
            <p>Menu List:</p>
            <hr />
            <table className='border-spacing-4'>
                <tr>
                    <th>Food Name</th>
                    <th className='p-2'>Quantity</th>
                    <th className='p-2 '>Price</th>
                </tr>
            {props.foods.map((food)=>(
                    <tr>
                        <td>{food.name}</td>
                        <td className='p-2'>{food.quantity}</td>
                        <td className='p-2'>{food.price}</td>
                    </tr>
                
            ))}
            </table>
            <hr />
            <div className='absolute right-0 bottom-0'>    
            <p>Total price: {props.price}</p>
            </div>
        </div>
    );
}



