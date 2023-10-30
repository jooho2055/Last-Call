import React from 'react';

export default function RestaurantMenu({restarantmenuInfo}) {
    const {fname, quantity, oprice, aprice} = restarantmenuInfo;
    return (
        <div className='w-[600px]'>
        <div className='border border-collapse border-spacing-4'>
            <div className="grid grid-cols-5 border-b bg-gray-100 font-semibold">
                   <div className="p-2">Food Name</div>
                   <div className="p-2">Quantity</div>
                   <div className="p-2">Original Price</div>
                   <div className="p-2">Actual Price</div>
            </div>
            <div className="grid grid-cols-5 border-b">
                        <div className="p-2">{fname}</div>
                        <div className="p-2">{quantity}</div>
                        <div className="p-2">$ {oprice}</div>
                        <div className="p-2">$ {aprice}</div>
                        <div className="p-2"><button>Delete</button></div>
            </div>

         </div> 
         </div>  

    );
}

