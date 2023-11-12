import React, {useState} from 'react';
import {Delete} from '../apis/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sampleFood from '../images/samplefood.png';
import DeleteButton from './Button/Delete';
import Edit from './Button/EditRestaurantMenu';

export default function RestaurantMenu({restarantmenuInfo}) {
    const {name, original_price, price, quantity, id, fk_menus_restaurant} = restarantmenuInfo;
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
       createMenuMutation.mutate({
            restaurantId: fk_menus_restaurant,
            menuId: id,
        })
    }
    return (
      // lists of menu
      <li className=' flex justify-between rounded-xl shadow-md'>
        <div className=' w-full flex'>
          <img
            src={sampleFood}
            className='max-w-[16rem] max-h-40 rounded-s-xl pr-2'
            alt='sample img'
          />
          <div className='flex flex-col justify-between'>
            <div className='flex-1'>
              <div className='flex justify-between'>
                <span className='text-lg font-bold pl-1 pt-1'>{name}</span>
                <span className='text-sm pt-2 pr-3'>
                  Remaining Count: <strong>{quantity}</strong>
                </span>
              </div>
  
              <div className='text-sm text-gray-500 pl-1 pt-1'>
                The food is made by chicken asdfasdf asdfasdf asdfasdf
              </div>
            </div>
            <div className='pb-1 pl-1'>
              <div className='flex justify-between text-sm'>
                <span>Original Price: </span>
                <span className='pr-5 line-through'>${original_price}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Discounted Price: </span>
                <span className='pr-5 font-bold text-orange-700'> ${price}</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className='pl-3'>
          <DeleteButton handleDetele={handleDetele}/>
          <Edit initialData={restarantmenuInfo}/>
        </div>
      </li>
    );
}

