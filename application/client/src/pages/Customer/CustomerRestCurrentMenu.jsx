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
		<div className='max-w-[80rem] m-auto mt-10'>
			<div>This is {restaurantInfo.name} current menu page (customer view)</div>

			<ul className='grid grid-cols-2 gap-8 px-12 pt-10 xl:grid-cols-1 xl:px-4'>
				{restaurantMenu?.map((item) => (
					<RestaurantMenu restarantmenuInfo={item} />
				))}
			</ul>
			<br />
		</div>
	);
}
