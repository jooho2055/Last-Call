import React from 'react';
import RestOrder from '../../components/Order/RestOrder';
import { getRestaurantOrder } from '../../apis/get';
import { useQuery } from '@tanstack/react-query';
import ViewOrder from '../../components/Button/ViewOrder';
import { useSelector } from 'react-redux';



export default function RestaurantOrder() {
    const user = useSelector((state) => state.user);
    const id = user.userId;
    const CurrentOrder = useQuery({
        queryKey: ["CurrentOrder"],
        queryFn: () => getRestaurantOrder(id),
    }) 
    const invoice_order = [];

    const isDuplicate = (array, item) => {
        if (array && array.length > 0) {
          if (array.filter(elem => elem.invoice_id === item.invoice_id).length > 0) {
            return true;
          }
        }
        array.push(item);
        return false;
      };

    return (
        <div>
            <h1 className='italic font-bold relative left-16'>Current Order</h1>
            <br />
            <div className='flex items-center justify-center flex-col'>
            {Array.isArray(CurrentOrder.data) &&
            CurrentOrder.data.map((menu, index)=>(        
            <React.Fragment key={index}>
              <div className='rounded-t-md border-t-4 border-orange-300'>
                <RestOrder orderInfo={menu} duplicate={isDuplicate(invoice_order, menu)} />
             </div>
            <div className='ml-44'>
                     <ViewOrder menuInfo={menu} />
            </div>    
            </React.Fragment>
           
            ))    
            }
            </div>
            
        </div>
    );
}

