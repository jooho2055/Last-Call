import React from 'react';
import Samplefood from '../images/samplefood.png';

export default function RestaurantMenuUnsold({onSelect, isSelected}) {
    const handleCheckboxChange = () =>{
      onSelect(!isSelected);
    }
    return (
        <div>
            <li className='flex items-center justify-center rounded-xl shadow-md'>
                <div className='pd-2 pl-4'>
                <input type='checkbox' 
                       name='selectFood' 
                       checked={isSelected} 
                       onChange={handleCheckboxChange}></input>
                </div>
                <div className='pd-2 pl-4'>
                <img 
                     src={Samplefood}
                     className='max-w-[16rem] max-h-20'
                     alt='sample img'
                     />
                </div>    
                <div className='pd-2 pl-4'>
                    Menu
                </div> 
                <div className='pd-2 pl-4'>     
                <input type='number' className='w-20 border border-orange-500'></input>
                </div>
            </li>
        </div>
    );
}

