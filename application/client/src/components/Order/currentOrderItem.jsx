import React from 'react';

export default function CurrentOrderItem(props) {
    return (
        <div className='border border-slate-600 relative w-80 h-80'>
            <p>Restaurant: {props.restaurant_name}</p>
            <p>Address: {props.address}</p>
            <p>Date: {props.date}</p>
            <p>Pick up by: {props.time}</p>
            <p>Status: {props.status}</p>
            <p>Menu List:</p>
            <div className='border border-collapse border-spacing-4'>
                <div className="grid grid-cols-3 border-b bg-gray-100 font-semibold">
                   <div className="p-2">Food Name</div>
                   <div className="p-2">Quantity</div>
                   <div className="p-2">Price</div>
                 </div>
                 {props.foods.map((food)=>(
                    <div className="grid grid-cols-3 border-b">
                        <div className="p-2">{food.name}</div>
                        <div className="p-2">{food.quantity}</div>
                        <div className="p-2">{food.price}</div>
                    </div>
                
            ))}
            </div>
            <div className='absolute right-0 bottom-0'>    
            <p>Total price: {props.price}</p>
            </div>
        </div>
    );
}



