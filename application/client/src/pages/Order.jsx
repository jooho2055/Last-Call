
import React, { useEffect } from 'react';
import HistoryOrderItem from '../components/Order/HistoryOrderItem';
import CurrentOrderItem from '../components/Order/currentOrderItem';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  
  const getCurrentOrder = async () => {
    try {
      const response = await axios.get(`http://13.52.182.209/customers/order/current/${user.userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current order:', error);
      throw error;
    }
  };

  const getPastOrder = async () => {
    try {
      const response = await axios.get(`http://13.52.182.209/customers/order/past/${user.userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching past order:', error);
      throw error;
    }
  };

  const currentItems = useQuery({
    queryKey: ["currentItems"],
    queryFn: getCurrentOrder,
  });

  const pastItems = useQuery({
    queryKey: ["pastItem"],
    queryFn: getPastOrder,
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
