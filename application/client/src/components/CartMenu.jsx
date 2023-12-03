import React from 'react';
import { useState } from 'react';
import { deleteOneMenuCart } from '../apis/delete';
import { editQuantityInCart } from '../apis/put';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BtnForCustomer from './BtnForCustomer';

export default function CartMenu({ CartMenuInfo, userId }) {
	const {
		id,
		cart_id,
		name,
		description,
		img_path,
		quantity,
		original_price,
		price,
		leftover,
		restaurant,
	} = CartMenuInfo;
	const [quantityUserSelect, setQuantityUserSelect] = useState(quantity);
	const queryClient = useQueryClient();

	const deleteOneMenuMutation = useMutation({
		mutationFn: ({ menuId, customerId }) => deleteOneMenuCart({ menuId, customerId }),
		onSuccess: () => {
			queryClient.invalidateQueries(['cartMenuLists']);
		},
	});

	const editQuantity = useMutation({
		mutationFn: ({ cartId, quantity }) => editQuantityInCart({ cartId, quantity }),
		onSuccess: () => {
			queryClient.invalidateQueries(['cartMenuLists']);
		},
	});

	const handleDeleteOne = () => {
		deleteOneMenuMutation.mutate({
			menuId: id,
			customerId: userId,
		});
	};

	const handleDecrement = () => {
		if (quantityUserSelect > 1) {
			setQuantityUserSelect((prevQuantity) => {
				const newQuantity = prevQuantity - 1;
				// Call the mutation inside this callback
				editQuantity.mutate({
					cartId: cart_id,
					quantity: newQuantity,
				});
				return newQuantity;
			});
		}
	};

	const handleIncrement = () => {
		if (quantityUserSelect < leftover) {
			setQuantityUserSelect((prevQuantity) => {
				const newQuantity = prevQuantity + 1;
				// Call the mutation inside this callback
				editQuantity.mutate({
					cartId: cart_id,
					quantity: newQuantity,
				});
				return newQuantity;
			});
		}
	};

	return (
		<li className='flex justify-between w-[55rem] shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] rounded-lg'>
			<div className='flex'>
				<div className='relative'>
					<img
						src={`http://13.52.182.209${img_path}`}
						className='max-w-[16rem] h-[11rem] object-cover rounded-l-lg' // Adjusted classes
						alt='sample img'
					/>
					<div className='absolute px-5 inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-0 hover:bg-opacity-50 hover:rounded-l-lg'>
						<p className='text-white text-center'>{description}</p>
					</div>
				</div>

				<div className='pl-3 min-w-[15rem] flex flex-col justify-between pr-10'>
					<div className='flex flex-col font-medium'>
						<span className='text-xl'>{restaurant}</span>
						<span className='mt-2 text-lg'>{name}</span>
					</div>
					<div className='pb-10 pl-10'>
						<span className='block mb-1'>Discounted Price: </span>
						<span className='line-through mr-1 ml-6'>{original_price}</span>
						<span className='font-bold text-orange-700 text-xl'>
							={'>'} ${price}
						</span>
					</div>
				</div>
			</div>

			<div className='flex flex-col justify-center'>
				<div className='ml-8 text-base text-green-800 font-bold pl-2 pb-3'>
					[ Only {leftover} left ]
				</div>
				<div className='text-center flex justify-center items-center mr-10'>
					<span className='mr-5 font-medium'>Quantity: </span>
					<button className='border-y-2 h-7 w-7 bg-stone-300' onClick={handleDecrement}>
						-
					</button>
					<div className='border-2 h-7 w-7 font-bold'>{quantityUserSelect}</div>
					<button className='border-y-2 h-7 w-7 bg-stone-300' onClick={handleIncrement}>
						+
					</button>
				</div>
			</div>

			<BtnForCustomer
				onClick={handleDeleteOne}
				className='bg-primary mr-14 my-[4.30rem] px-3 rounded-lg text-stone-100 font-medium'
			>
				Delete
			</BtnForCustomer>
		</li>
	);
}
