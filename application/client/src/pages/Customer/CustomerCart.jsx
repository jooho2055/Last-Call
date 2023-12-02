import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartLists } from '../../apis/get';
import { useParams } from 'react-router-dom';
import { deleteAllMenuCart } from '../../apis/delete';
import CartMenu from '../../components/CartMenu';
import BtnForCustomer from '../../components/BtnForCustomer';

export default function CustomerCart() {
	const { userId } = useParams();
	const queryClient = useQueryClient();
	const [checkedItems, setCheckedItems] = useState({});

	const {
		data: cartMenuLists,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['cartMenuLists'],
		queryFn: () => getCartLists(userId),
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteAllMenuCart(userId),
		onSuccess: () => {
			queryClient.invalidateQueries(['cartMenuLists']);
		},
	});

	const handleCheck = (id, isChecked) => {
		setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
	};

	const handleCheckout = () => {
		console.log(checkedItems);
		// Implement the logic to handle checkout with only checked items
	};

	const handleDeleteAll = () => {
		deleteMutation.mutate({
			customerId: userId,
		});
	};

	const calculateSubtotal = () => {
		// Check if cartMenuLists and cartMenuLists.orders are defined
		if (cartMenuLists && cartMenuLists.orders) {
			return cartMenuLists.orders.reduce((total, item) => {
				if (checkedItems[item.id]) {
					return total + item.price * item.quantity;
				}
				return total;
			}, 0);
		}
		return 0; // Return 0 if data is not loaded yet
	};
	const subtotal = calculateSubtotal();

	const calculateTax = (subtotal) => {
		return subtotal * 0.0863;
	};
	const taxes = calculateTax(subtotal);

	const calcutaleTotal = (subtotal, taxes) => {
		return subtotal + taxes;
	};
	const total = calcutaleTotal(subtotal, taxes);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Guard clause for error state
	if (isError || !cartMenuLists) {
		return <div>Error loading data</div>;
	}

	return (
		<div className='max-w-[80rem] m-auto mt-10'>
			<div className='text-left text-2xl font-medium'>My Cart</div>
			<ul className='flex flex-col mx-28 px-10 pt-10 gap-y-14 lg:mx-12 sm:items-center'>
				{cartMenuLists.orders.map((item) => (
					<div key={item.id} className='flex justify-center'>
						<div className='mr-10 flex items-center'>
							<input
								type='checkbox'
								checked={!!checkedItems[item.id]}
								onChange={(e) => handleCheck(item.id, e.target.checked)}
								className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
						</div>

						<CartMenu CartMenuInfo={item} />
					</div>
				))}
			</ul>

			<div className='max-w-[80rem] m-auto mt-20 mx-20 px-6 py-6 mb-24 bg-slate-100 rounded-lg flex justify-between shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)]'>
				<div className='flex flex-col justify-center font-medium text-2xl ml-10 gap-y-3'>
					<div className='text-xl'>Subtotal</div>
					<div>${subtotal.toFixed(2)}</div>
				</div>
				<div className='flex flex-col justify-center font-medium text-2xl'>+</div>
				<div className='flex flex-col justify-center font-medium text-2xl gap-y-3'>
					<div className='text-xl'>Tax</div>
					<div>${taxes.toFixed(2)}</div>
				</div>
				<div className='flex flex-col justify-center font-medium text-2xl'>=</div>
				<div className='flex flex-col justify-center font-medium text-2xl mr-10 gap-y-3'>
					<div className='text-xl'>Total</div>
					<div>${total.toFixed(2)}</div>
				</div>
				{/* <button onClick={handleDeleteAll}>delete all menu</button>
				 */}
			</div>

			<div className='text-right mb-10'>
				<BtnForCustomer
					className='bg-primary px-4 py-3 text-white text-lg font-medium rounded-3xl shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)]'
					onClick={handleCheckout}
				>
					Checkout Selected Items
				</BtnForCustomer>
			</div>
		</div>
	);
}
