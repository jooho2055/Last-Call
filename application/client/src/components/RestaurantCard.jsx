import React from 'react';
import { Card as RestCard } from 'semantic-ui-react';

export default function RestaurantCard({ restaurantInfo }) {
	const { name, location, cuisine, status } = restaurantInfo;

	return (
		<div>
			<RestCard>
				<RestCard.Content>
					<RestCard.Header>{name}</RestCard.Header>
					<RestCard.Description>{cuisine}</RestCard.Description>
					<RestCard.Description>{location}</RestCard.Description>
					<RestCard.Description>{status > 0 ? 'open' : 'close'}</RestCard.Description>
				</RestCard.Content>
			</RestCard>
		</div>
	);
}
