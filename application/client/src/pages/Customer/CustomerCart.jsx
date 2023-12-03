import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartLists } from '../../apis/get';
import { useParams } from 'react-router-dom';
import { deleteAllMenuCart } from '../../apis/delete';
import { cartCheckout } from '../../apis/post';
import CartMenu from '../../components/CartMenu';
import BtnForCustomer from '../../components/BtnForCustomer';

export default function CustomerCart() {
	const { userId } = useParams();
	const queryClient = useQueryClient();
	// const [checkedItems, setCheckedItems] = useState({});

	const {
		data: cartMenuLists,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['cartMenuLists'],
		queryFn: () => getCartLists(userId),
	});

	const deleteAllMenuMutation = useMutation({
		mutationFn: () => deleteAllMenuCart(userId),
		onSuccess: () => {
			queryClient.invalidateQueries(['cartMenuLists']);
		},
	});

	const cartCheckoutMutation = useMutation({
		mutationFn: () => cartCheckout(userId),
		onSuccess: () => {
			// Clearing the cart after successful checkout
			queryClient.invalidateQueries(['cartMenuLists']);
			// setCheckedItems({}); // Clear the checked items
		},
	});

	// const handleCheck = (id, isChecked) => {
	// 	setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
	// };

	const handleCheckout = () => {
		cartCheckoutMutation.mutate({
			customerId: userId,
		});
	};

	const handleDeleteAll = () => {
		deleteAllMenuMutation.mutate({
			customerId: userId,
		});
	};

	const calculateSubtotal = () => {
		// Check if cartMenuLists and cartMenuLists.orders are defined
		if (cartMenuLists && cartMenuLists.orders) {
			return cartMenuLists.orders.reduce((total, item) => {
				return total + item.price * item.quantity;
			}, 0);
		}
		return 0; // Return 0 if data is not loaded yet
	};

	const calculateTax = (subtotal) => {
		return subtotal * 0.0863;
	};

	const calcutaleTotal = (subtotal, taxes) => {
		return subtotal + taxes;
	};

	const subtotal = calculateSubtotal();
	const taxes = calculateTax(subtotal);
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
			<div className='flex justify-between'>
				<div className='text-2xl font-medium'>My Cart</div>
				<BtnForCustomer
					onClick={handleDeleteAll}
					className='bg-primary px-4 py-2 text-white text-lg font-medium rounded-[2.0rem] shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)]'
				>
					Empty Cart
				</BtnForCustomer>
			</div>

			<ul className='flex flex-col mx-28 px-10 pt-10 gap-y-14 lg:mx-12 sm:items-center'>
				{cartMenuLists.orders?.map((item) => (
					<div key={item.id} className='flex justify-center'>
						{/* <div className='mr-10 flex items-center'>
							<input
								type='checkbox'
								checked={!!checkedItems[item.id]}
								onChange={(e) => handleCheck(item.id, e.target.checked)}
								className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
						</div> */}
						<CartMenu CartMenuInfo={item} userId={userId} />
					</div>
				))}
			</ul>

			<div className='max-w-[80rem] m-auto mt-20 mx-20 px-6 py-6 mb-24  rounded-lg flex justify-between'>
				<div className='w-28 h-32 flex flex-col justify-center font-medium text-xl gap-y-3 bg-stone-100 rounded-xl text-center ml-10'>
					<div className='text-lg'>Subtotal</div>
					<div>${subtotal.toFixed(2)}</div>
				</div>
				<div className='flex flex-col justify-center font-medium text-2xl'>+</div>
				<div className='w-28 h-32 flex flex-col justify-center font-medium text-xl gap-y-3 text-center bg-stone-100 rounded-xl'>
					<div className='text-lg'>Tax</div>
					<div>${taxes.toFixed(2)}</div>
				</div>
				<div className='flex flex-col justify-center font-medium text-2xl'>=</div>
				<div className='w-36 h-32 flex flex-col justify-center font-medium text-xl gap-y-3 bg-stone-100 rounded-xl text-center mr-10'>
					<div className='text-lg text-center'>Total</div>
					<div className='text-2xl'>${total.toFixed(2)}</div>
				</div>
				{/* <button onClick={handleDeleteAll}>delete all menu</button>
				 */}
			</div>

			<div className='text-right mb-14'>
				<BtnForCustomer
					className='bg-primary px-7 py-5 text-white text-xl font-medium rounded-[2.0rem] shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)]'
					onClick={handleCheckout}
				>
					Checkout Selected Items
				</BtnForCustomer>
			</div>
		</div>
	);
}
