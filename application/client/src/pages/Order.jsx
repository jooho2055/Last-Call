
import React, { useEffect } from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';
import { useSelector } from 'react-redux';
import {getCurrentOrder, getPastOrder} from '../apis/getorder'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate('/signin');
    }
  }, []);


  const currentItems = useQuery({
    queryKey: ["currentItems"],
    queryFn: getCurrentOrder(user.userId),
  });

  const pastItems = useQuery({
    queryKey: ["pastItem"],
    queryFn: getPastOrder(user.userId),
  });

  return (
    <div className='min-h-full m-auto flex flex-col justify-center items-center bg-white gap-4'>
      <br />
      <h3>Current Order</h3>
      <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-5 gap-4'>
        {currentItems.data?.map(input => (
          <CurrentOrderItem currentorderInfo={input} />
        ))}
      </div>
      <br />
      <hr className='border-t-4 border-solid border-blue-500 w-full' />
      <br />
      <h3>Order History</h3>
      <div className='grid sm:grid-cols-1 md:grid-cols-1 grid-cols-2 gap-9'>
        {pastItems.data?.map(input => (
          <HistoryOrderItem historyOrderInfo={input} />
        ))}
      </div>
    </div>
  );
}
