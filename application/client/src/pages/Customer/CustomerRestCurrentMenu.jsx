import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchRestaurantAvailableMenu, fetchRestaurantInfo } from '../../apis/get';
import { useLocation, useParams } from 'react-router-dom';

export default function CustomerRestCurrentMenu() {
	const { id } = useParams();
	const [menus, setMenus] = useState([]);

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
		<div>
			<div>This is {restaurantInfo.name} current menu page (customer view)</div>
			<div>{id}</div>
			<div>
				{restaurantMenu?.map((item) => (
					<div>{item.name}</div>
				))}
			</div>
		</div>
	);
}
