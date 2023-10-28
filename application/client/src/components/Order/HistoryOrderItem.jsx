import React from 'react';

export default function HistoryOrderItem(props) {
    return (
        <div className='border border-slate-600 relative h-72 w-96 flex flex-col'>
            <p>Date: {props.date}&emsp;{props.time}</p>
            <div className='relative bottom-0 left-0'>
                <p>Restaurant: {props.restaurant_name}</p>
                <p>Address: {props.address}</p>
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
         
            </div>
            <div className='absolute bottom-0 right-0'>
                <p>Original Price: {props.original_p}</p>
                <p>Actual paid: {props.actual_p}</p>
            </div>
         <br />   
        </div>
    );
}

