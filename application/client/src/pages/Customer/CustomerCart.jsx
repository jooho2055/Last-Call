import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCartLists } from '../../apis/get';
import { useParams } from 'react-router-dom';
import { deleteAllMenuCart } from '../../apis/delete';

export default function CustomerCart() {
	const { userId } = useParams();

	const handleDelete = () => {
		console.log(userId);
		deleteAllMenuCart(userId);
	};

	const { data: cartMenuLists } = useQuery({
		queryKey: ['cartMenuLists'],
		queryFn: () => getCartLists(userId),
	});

	return (
		<div>
			<div>this is customer cart page</div>
			<button onClick={handleDelete}>delete</button>
		</div>
	);
}
