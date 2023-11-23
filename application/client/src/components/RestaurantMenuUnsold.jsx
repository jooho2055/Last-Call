import React, { useState } from 'react';
import Samplefood from '../images/samplefood.png';

export default function RestaurantMenuUnsold({restarantmenuInfo, onQuantityChange}) {
    const {name, img, quantity, id, restaurant_id} = restarantmenuInfo;
    const [localquantity, setLocalQuantity] = useState(quantity || '');
    const handleQuantityChange = (e) =>{
        const newQuantity = e.target.value;
        setLocalQuantity(newQuantity);
        onQuantityChange(id, newQuantity);
    }
    return (
        <div className='pd-4'>
            <li className='flex items-center justify-center rounded-xl shadow-md'>
                <div className='pd-2 pl-4'>
                <input type='checkbox' 
                       name='selectFood' />
                </div>
                <div className='pd-2 pl-4'>
                <img 
                     src={Samplefood}
                     className='max-w-[16rem] max-h-20'
                     alt='sample img'
                     />
                </div>    
                <div className='pd-2 pl-4 flex-grow'>{name}</div> 
                <div className='pd-2 pl-4'>     
                <input type='number' className='w-20 border border-slate-900 rounded' 
                placeholder={quantity}
                value={localquantity}
                onChange={handleQuantityChange}></input>
                </div>
            </li>
        </div>
    );
}

