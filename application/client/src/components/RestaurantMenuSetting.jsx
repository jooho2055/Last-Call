import React from 'react';
import sampleFood from '../images/samplefood.png';
import DeleteButton from './Button/Delete';
import Edit from './Button/EditRestaurantMenu';

export default function RestaurantMenuSetting({restarantmenuInfo, unsold}) {
const {name, original_price, price, quantity, id, restaurant_id, description} = restarantmenuInfo;

const myData = {restaurantId: restaurant_id, menuId: id};  
const handleDetele = async(e)=>{
    e.preventDefault();
    console.log('Delete button clicked');
     fetch('http://13.52.182.209/restaurants/menu/delete', 
     {method: 'DELETE',
     headers: { 
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(myData)
  })

}

    return (
      // lists of menu
      <li className='flex items-center justify-center rounded-xl shadow-md'>
        <div>
          <img
            src={sampleFood}
            className='rounded-t-xl'
            alt='sample img'
          />
          <div>
            <div>
              <div className='pb-2'>
                <span className='text-lg'>{name}</span>
              </div>
  
              <div className='pb-2 text-sm text-gray-500'>
                {description}
              </div>
            </div>
            <div className='pb-3 pl-1'>
             {unsold &&(
              <div className='flex justify-between text-sm'>
              <span>Quantity: </span>
              <span className='pr-5'>{quantity}</span>
              </div>
             )} 
            
              <div className='flex justify-between text-sm'>
                <span>Original Price: </span>
                <span className='pr-5'>${original_price}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Discounted Price: </span>
                <span className='pr-5'> ${price}</span>
              </div>
            </div>
          </div>
          {!unsold && (
             <div className='pb-1 pl-1 flex justify-between'>
             <span>
            <DeleteButton handleDetele={handleDetele} />
             </span>
             <span className='pr-5'>
             <Edit initialData={restarantmenuInfo}/>
              </span>
            </div>
          )}
         
        </div>

      </li>
    );
}

