import React from 'react';
import { Card as RestCard } from 'semantic-ui-react';

export default function RestaurantCard({ restaurantInfo }) {
	return (
		<div>
			<RestCard>
				<RestCard.Content>
					<RestCard.Header>{restaurantInfo.name_r}</RestCard.Header>
					<RestCard.Description>{restaurantInfo.cuisine}</RestCard.Description>
					<RestCard.Description>
						{restaurantInfo.status > 0 ? 'open' : 'close'}
					</RestCard.Description>
				</RestCard.Content>
			</RestCard>
		</div>
	);
}
