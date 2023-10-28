import React from 'react';

export default function HistoryOrderItem(props) {
    return (
        <div className='border border-slate-600 relative h-72 w-96 flex flex-col'>
            <p>Date: {props.date}&emsp;{props.time}</p>
            <div className='relative bottom-0 left-0'>
                <p>Restaurant: {props.restaurant_name}</p>
                <p>Address: {props.address}</p>
                <p>Menu List:</p>
                <hr />
                <table className='border-spacing-4'>
                <tr>
                    <th>Food Name</th>
                    <th className='p-2'>Quantity</th>
                    <th className='p-2'>Price</th>
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
            </div>
            <div className='absolute bottom-0 right-0'>
                <p>Original Price: {props.original_p}</p>
                <p>Actual paid: {props.actual_p}</p>
            </div>
         <br />   
        </div>
    );
}

