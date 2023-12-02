import React, { useEffect, useState } from 'react';

export default function RestOrder({ orderInfo, duplicate }) {
  const { invoice_id, created_at, customer_id } = orderInfo;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const OrderShows = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex gap-8">
        {!duplicate && (
          <li className='flex items-center justify-center rounded-xl shadow-md'>
            <div className='pd-2 pl-4'>
              <span>{invoice_id}</span>
            </div>
            <div className='pd-2 pl-32'>
              <span>{created_at}</span>
            </div>
            <div className='flex pd-2 pl-32 flex-col'>
              <span>Customer id: {customer_id}</span>
              <span>Customer_name</span>
            </div>
            <div className='pd-2 pl-72 flex gap-4 flex-row md:flex-col md:gap-4'>
              <span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4 md:mb-0" onClick={OrderShows}>View</button>
              </span>
            </div>
          </li>
        )}
      </div>
    
    </div>
  );
}
