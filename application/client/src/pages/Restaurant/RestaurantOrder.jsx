import React from 'react';
import RestOrder from '../../components/Order/RestOrder';
import { getRestaurantOrder } from '../../apis/get';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';



export default function RestaurantOrder() {
    const user = useSelector((state) => state.user);
    const id = user.userId;
    const CurrentOrder = useQuery({
        queryKey: ["CurrentOrder"],
        queryFn: () => getRestaurantOrder(id),
    }) 

    
    return (
        <div>
            <h1 className='italic font-bold relative left-16'>Current Order</h1>
            <br />
            <div className='flex items-center justify-center flex-col'>
            {Array.isArray(CurrentOrder.data) &&
            CurrentOrder.data.map((menu, index)=>(        
              <RestOrder key={index} orderInfo={menu} />
            ))    
            }
            </div>
            
        </div>
    );
}

