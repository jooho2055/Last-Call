import React from 'react';
import RestaurantMenu from '../../components/RestaurantMenu';

export default function OrderCard({ restaurant, order, className, isCurrentOrder }) {
	const { total, name, address, created_at } = restaurant;
	const taxRate = 0.0863; // 8.63% tax rate

	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	const calculateTotalWithTax = (subtotal) => {
		return (subtotal * (1 + taxRate)).toFixed(2);
	};

	const totalWithTax = calculateTotalWithTax(parseFloat(total));

	return (
		<div className={className}>
			<h2 className='text-center mt-5 text-xl m-auto border-2 border-black rounded-2xl shadow-2xl px-3 py-1 mb-2 '>
				{name}
			</h2>
			{!isCurrentOrder ? (
				<p className='text-base text-center my-4'>Date: {formatDate(created_at)}</p>
			) : (
				''
			)}

			{isCurrentOrder ? (
				<>
					<p className='text-base text-center my-2'>Address: {address}</p>

					<ul className='flex-1 bg-stone-100 rounded-xl mx-8'>
						<div className='ml-6 underline text-xl m-auto px-2 py-[0.17rem] rounded-lg my-4'>
							Total {order.length} items
						</div>
						{order?.map((item, itemIndex) => (
							<RestaurantMenu
								key={itemIndex}
								restarantmenuInfo={item}
								isOrderView={true}
							/>
						))}
					</ul>

					<div className='flex justify-between mb-4 mt-3'>
						<span className='ml-8'>Total: </span>
						<span className='text-2xl mr-8 text-[#DE6913]'>$ {totalWithTax}</span>
					</div>
				</>
			) : (
				<>
					<div className='flex flex-col flex-1'>
						<span className='ml-10 underline text-xl m-auto px-2 py-[0.17rem] rounded-lg'>
							Total {order.length} items
						</span>
						<ul className='flex-1 mt-2 ml-12'>
							{order?.map((item, itemIndex) => (
								<RestaurantMenu
									key={itemIndex}
									restarantmenuInfo={item}
									isOrderView={true}
								/>
							))}
						</ul>
					</div>

					<div className='flex justify-between mb-4'>
						<span className='ml-8'>Total: </span>
						<span className='text-2xl mr-8 text-[#DE6913]'>$ {totalWithTax}</span>
					</div>
				</>
			)}
		</div>
	);
}
