import React from 'react';
import { Card as RestCard } from 'semantic-ui-react';

export default function RestaurantList({ restaurantInfo }) {
	const { name, location, cuisine, status } = restaurantInfo;

	return (
		<RestCard className='w-full'>
			<RestCard.Content className='text-lg flex flex-col justify-between mt-2 ml-1 mr-1'>
				<div className='font-bold'>
					<RestCard.Header>{name}</RestCard.Header>
				</div>
				<div className='flex justify-between text-base'>
					<RestCard.Description>{cuisine}</RestCard.Description>
					<RestCard.Description>{status}</RestCard.Description>
				</div>
			</RestCard.Content>
		</RestCard>
	);
}
