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
            <table className='border-spacing-4 absolute left-1'>
                <tr className='border border-slate-600'>
                    <th className='border border-slate-600'>Food Name</th>
                    <th className='p-2 border border-slate-600'>Quantity</th>
                    <th className='p-2 border border-slate-600'>Price</th>
                </tr>
            {props.foods.map((food)=>(
                    <tr className='border border-slate-600'>
                        <td className='border border-slate-600'>{food.name}</td>
                        <td className='p-2 border border-slate-600'>{food.quantity}</td>
                        <td className='p-2 border border-slate-600'>{food.price}</td>
                    </tr>
                
            ))}
            </table>
            <div className='absolute right-0 bottom-0'>
            <p>Total price: {props.price}</p>
            </div>
        </div>
    );
}



