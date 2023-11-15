import React, {useState} from 'react';
import {Delete} from '../apis/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sampleFood from '../images/samplefood.png';
import DeleteButton from './Button/Delete';
import Edit from './Button/EditRestaurantMenu';

export default function RestaurantMenuSetting({restarantmenuInfo}) {
    const {name, original_price, price, quantity, id, restaurant_id} = restarantmenuInfo;
    const queryClient = useQueryClient();
    const createMenuMutation = useMutation({
        mutationFn: Delete,
        onSuccess: data => {
          queryClient.setQueryData(["posts", data.id], data);
          queryClient.invalidateQueries(["posts"], { exact: true });
        },
        onError: error => {
          console.error('Mutation Error:', error);
        },
      });
    const handleDetele = async(e)=>{
        e.preventDefault();
        console.log('Delete button clicked');
      try{ 
       createMenuMutation.mutate({
            restaurantId: restaurant_id,
            menuId: id,
        })
      }catch (error) {
        console.error('An error occurred:', error);
      }
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
                The food is made by chicken
              </div>
            </div>
            <div className='pb-3 pl-1'>
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
          <div className='pb-1 pl-1 flex justify-between'>
           <span>
          <DeleteButton handleDetele={handleDetele} />
           </span>
           <span className='pr-5'>
           <Edit initialData={restarantmenuInfo}/>
            </span>
      </div>
        </div>

      </li>
    );
}

