import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCartLists } from '../../apis/get';
import { useParams } from 'react-router-dom';
import { deleteAllMenuCart } from '../../apis/delete';
import CartMenu from '../../components/CartMenu';

export default function CustomerCart() {
	const { userId } = useParams();

	const { data: cartMenuLists } = useQuery({
		queryKey: ['cartMenuLists'],
		queryFn: () => getCartLists(userId),
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteAllMenuCart(userId),
		onSuccess: () => {
			console.log('Deletion successful');
		},
	});

	const handleDeleteAll = () => {
		deleteMutation.mutate({
			customerId: userId,
		});
	};

	return (
		<div className='max-w-[80rem] m-auto mt-10'>
			<div>This is cart page</div>

			{cartMenuLists && cartMenuLists.orders ? (
				<ul className='flex flex-col mx-28 px-10 pt-10 lg:mx-12 sm:items-center'>
					{cartMenuLists.orders.map((item) => (
						<CartMenu key={item.id} CartMenuInfo={item} />
					))}
				</ul>
			) : (
				<div>No items in the cart.</div>
			)}

			<div className='max-w-[80rem] m-auto mt-20 px-10 pt-10'>this is total section</div>
			<button onClick={handleDeleteAll}>delete all menu</button>
		</div>
	);
}
