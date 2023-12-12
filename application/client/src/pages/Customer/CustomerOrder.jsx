import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { customerGetCurrentOrder, customerGetOrderHistory } from '../../apis/get';

import OrderCard from '../../components/Order/OrderCard';

export default function CustomerOrder() {
	const { userId } = useParams();

	const { isLoading: isLoadingCurrentOrder, data: currentOrder } = useQuery({
		queryKey: ['currentOrder'],
		queryFn: () => customerGetCurrentOrder(userId),
	});

	const { isLoading: isLoadingOrderHistory, data: orderHistory } = useQuery({
		queryKey: ['orderHistory'],
		queryFn: () => customerGetOrderHistory(userId),
	});

	if (isLoadingCurrentOrder || isLoadingOrderHistory) {
		return <div>Loading orders...</div>; // Display loading message
	}

	// const { orders, restaurants } = currentOrder;
	// const { orders: historyOrders, restaurants: historyRestaurants } = orderHistory;

	return (
		<div className='max-w-[80rem] m-auto flex flex-col justify-between'>
			<div className='mt-14 mb-14'>
				<span className='text-3xl'>Current Order</span>
				<div className='grid grid-cols-3 pt-20 gap-12'>
					{currentOrder &&
						currentOrder?.orders?.map((order, index) => {
							const restaurant = currentOrder?.restaurants?.[index];

							return (
								<OrderCard
									key={index}
									className='w-96 h-96 bg-[#f7e8dc] shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] rounded-lg font-medium text-lg mx-auto flex flex-col justify-between '
									restaurant={restaurant}
									order={order}
									isCurrentOrder={true}
								></OrderCard>
							);
						})}
				</div>
			</div>

			<div className='mb-14'>
				<span className='text-3xl'>Order History</span>
				<div className='grid grid-cols-3 mt-20 gap-12'>
					{orderHistory &&
						orderHistory?.orders?.map((order, index) => {
							const restaurant = orderHistory?.restaurants?.[index];

							return (
								<OrderCard
									key={index}
									className='w-[21rem] h-80 bg-[#e6edf5] shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] rounded-lg font-medium text-lg mx-auto flex flex-col justify-between'
									restaurant={restaurant}
									order={order}
									isCurrentOrder={false}
								></OrderCard>
							);
						})}
				</div>
			</div>
		</div>
	);
}
