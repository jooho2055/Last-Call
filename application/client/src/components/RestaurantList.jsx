import React from 'react';
import { Card as RestCard } from 'semantic-ui-react';

export default function RestaurantList({ restaurantInfo }) {
	const { name, location, cuisine, status } = restaurantInfo;

	return (
		<div>
			<RestCard>
				<RestCard.Content>
					<RestCard.Header>{name}</RestCard.Header>
					<RestCard.Description>{cuisine}</RestCard.Description>
					<RestCard.Description>{location}</RestCard.Description>
					<RestCard.Description>{status}</RestCard.Description>
				</RestCard.Content>
			</RestCard>
		</div>
	);
}
