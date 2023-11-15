import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCartLists } from '../../apis/get';
import { useParams } from 'react-router-dom';

export default function CustomerCart() {
	const { userId } = useParams();

	const { data: cartMenuLists } = useQuery({
		queryKey: ['cartMenuLists'],
		queryFn: () => getCartLists(userId),
	});

	return <div>this is customer cart page</div>;
}
