import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchRestaurantAvailableMenu, fetchRestaurantInfo } from '../../apis/get';
import { useLocation, useParams } from 'react-router-dom';
import RestaurantMenu from '../../components/RestaurantMenu';

export default function CustomerRestCurrentMenu() {
	const { id } = useParams();

	const {
		isLoading: isMenuLoading,
		error: menuError,
		data: restaurantMenu,
	} = useQuery({
		queryKey: ['restaurantMenu', id],
		queryFn: () => fetchRestaurantAvailableMenu(id),
		enabled: !!id,
	});

	const {
		isLoading: isInfoLoading,
		error: infoError,
		data: restaurantInfo,
	} = useQuery({
		queryKey: ['restaurantInfo', id],
		queryFn: () => fetchRestaurantInfo(id),
		enabled: !!id,
	});

	if (isMenuLoading || isInfoLoading) {
		return <p>Loading...</p>;
	}

	if (menuError || infoError) {
		return <p>Error: {menuError?.message || infoError?.message}</p>;
	}

	return (
		<div className='text-center'>
			<div>This is {restaurantInfo.name} current menu page (customer view)</div>

			<ul className='m-10'>
				{restaurantMenu?.map((item) => (
					<RestaurantMenu restarantmenuInfo={item} />
				))}
			</ul>
		</div>
	);
}
