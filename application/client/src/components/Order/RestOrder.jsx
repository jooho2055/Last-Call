import React from 'react';
import { format } from 'date-fns';
export default function RestOrder({ orderInfo, duplicate }) {
  const { invoice_id, created_at, customer_id } = orderInfo;
  const dateObject = new Date(created_at);
  const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm:ss');

  return (
    <div>
      <div className="flex gap-8">
        {!duplicate && (
          <div>
          <li className='flex'>
            <div className='pd-2 pl-2'>
              <span className='italic text-2xl text-orange-600'>{invoice_id}</span>
            </div>
            <div className='pd-2 pl-32'>
              <span className='italic'>{formattedDate}</span>
            </div>
            <div className='flex pd-2 pl-32 flex-col'>
              <span className='italic'>Customer id: {customer_id}</span>
            </div>
            <div className='pd-2 pl-72 flex gap-4 flex-row md:flex-col md:gap-4'>
              <span>
              </span>
            </div>
          </li>
          <div>
            <div className='ml-16'>
              <span>MenuList: </span>
            </div>
           <div className='ml-40'>
           <div className=" w-[900px] relative">
           <li className='flex'>
            <div className='pd-2 pl-4'>
            <span>Menu Id</span>
            </div>
            <div className='pd-2 pl-28'>
            <span>Menu Name</span>
            </div>
            <div className='pd-2 absolute left-[400px]'>
            <span className="monospaced">Quantity</span>
            </div>
            <div className='pd-2 absolute left-[580px]'>
             <span className="monospaced">Price</span>
            </div>
            </li>
            </div>
           </div>
          </div>
          </div>
        )}
      </div>
    
    </div>
  );
}
