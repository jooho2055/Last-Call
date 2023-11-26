import React from 'react';
import RestOrder from '../../components/Order/RestOrder';
import { getRestaurantOrder } from '../../apis/get';
import { useQuery } from '@tanstack/react-query';

export default function RestaurantOrder() {
    const id = 1;
    const CurrentOrder = useQuery({
        queryKey: ["CurrentOrder"],
        queryFn: () => getRestaurantOrder(id),
    })
    
    return (
        <div>
            <h1>Current Order</h1>
            <div className='flex items-center justify-center'>
            <RestOrder />
            </div>
            
        </div>
    );
}

