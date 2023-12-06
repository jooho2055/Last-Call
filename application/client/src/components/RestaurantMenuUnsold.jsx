import React, { useState } from 'react';

export default function RestaurantMenuUnsold({restarantmenuInfo, onQuantityChange, onCheckChange}) {
    const {name, quantity, id, img_path} = restarantmenuInfo;
    const [localquantity, setLocalQuantity] = useState(
        quantity !== undefined ? quantity : 0
      );
    const isChecked = restarantmenuInfo.checked || false; 
    const handleQuantityChange = (e) =>{
        const newQuantity = e.target.value;
        setLocalQuantity(newQuantity);
        onQuantityChange(id, newQuantity);
    }
    return (
        <div className='pd-4 mb-4'>
            <li className='flex items-center justify-center rounded-xl shadow-md'>
                <div className='pd-2 pl-4'>
                <input type='checkbox' 
                       name='selectFood' 
                       onChange={onCheckChange}
                       checked={isChecked}/>
                </div>
                <div className='pd-2 pl-4'>
                <div className='w-[175px]'>   
                <img 
                     src={`http://13.52.182.209${img_path}`}
                     className='max-w-[16rem] max-h-20 rounded-md'
                     alt='sample img'
                     />
                </div>      
                </div>    
                <div className='pd-2 flex-grow'>
                <div className='pl-4'>{name}</div>
                </div> 
                <div className='pd-2 pl-4'>     
                <input 
                type='number' 
                className='w-20 border border-slate-900 rounded' 
                placeholder={quantity}
                value={localquantity}
                onChange={handleQuantityChange} />
                </div>
            </li>
        </div>
    );
}

