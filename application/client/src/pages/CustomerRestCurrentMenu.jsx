import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { fetchRestaurantAvailableMenu } from '../apis/get';
import { useParams } from 'react-router-dom';

export default function CustomerRestCurrentMenu() {
	const { id } = useParams();
	const [menus, setMenus] = useState([]);

	const {
		isLoading,
		Error,
		data: restaurantMenu,
	} = useQuery({
		queryKey: ['restaurantMenu', id],
		queryFn: () => fetchRestaurantAvailableMenu(id),
		enabled: !!id,
	});

	if (isLoading) {
		<p>is loading</p>;
	}
	return (
		<div>
			<div>This is restaurant current menu page (customer view)</div>
			<div>{id}</div>
		</div>
	);
}
