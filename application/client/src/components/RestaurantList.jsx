import React from 'react';
import { Card as RestCard } from 'semantic-ui-react';

export default function RestaurantList({ restaurantInfo }) {
	const { name, cuisine, status } = restaurantInfo;

	return (
		<RestCard className='w-full'>
			<RestCard.Content className='text-lg flex flex-col justify-between mt-2 ml-2 mr-2 '>
				<div className='font-bold'>
					<RestCard.Header>{name}</RestCard.Header>
				</div>
				<div className='flex justify-between text-base mb-2'>
					<RestCard.Description>{cuisine}</RestCard.Description>
					<RestCard.Description
						className={`font-bold ${
							status === 'open' ? 'text-green-700' : 'text-red-600'
						}`}
					>
						{status}
					</RestCard.Description>
				</div>
			</RestCard.Content>
		</RestCard>
	);
}
