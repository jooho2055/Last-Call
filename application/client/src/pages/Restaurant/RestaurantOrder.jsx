import React from 'react';
import RestOrder from '../../components/Order/RestOrder';

export default function RestaurantOrder() {
    
    return (
        <div>
            <h1>Current Order</h1>
            <div className='flex items-center justify-center'>

            <RestOrder />
            </div>
            
        </div>
    );
}

