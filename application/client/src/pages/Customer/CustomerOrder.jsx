import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { customerGetCurrentOrder } from '../../apis/get';

export default function CustomerOrder() {

	const { userId } = useParams();

	const { data: currentOrder } = useQuery({
		queryKey: ['currentOrder'],
		queryFn: () => customerGetCurrentOrder(userId),
		staleTime: 120000,
	});
	return <div className=''>this is order section {userId}</div>;
}

