import React from 'react';
import {Delete} from '../apis/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function RestaurantMenu({restarantmenuInfo}) {
    const {name, original_price, price, description, id, fk_menus_restaurant} = restarantmenuInfo;
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
        <div className='w-[800px]'>
        <div className='border border-collapse border-spacing-4'>
            <p>{id}</p>
            <div className="grid grid-cols-6 border-b bg-gray-100 font-semibold">
                   <div className="p-2">Food Name</div>
                   <div className='p-2'>Description</div>
                   <div className="p-2">Original Price</div>
                   <div className="p-2">Actual Price</div>
            </div>
            <div className="grid grid-cols-6 border-b">
                        <div className="p-2">{name}</div>
                        <div className="p-2"> {description}</div>
                        <div className="p-2">$ {original_price}</div>
                        <div className="p-2">$ {price}</div>
                        <div className="p-2"><button>Edit</button></div>
                        <div className="p-2"><button onClick={handleDetele}>Delete</button></div>
            </div>

         </div> 
         </div>  

    );
}

