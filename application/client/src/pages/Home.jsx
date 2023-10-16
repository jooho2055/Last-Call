import React from 'react';
import Search from '../components/Search';
import { useState, useEffect } from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import RestaurantSignUp from './SignUp/RestaurantSignUp';
import UserSignUp from './SignUp/UserSignUp';

export default function Home() {
	const [restList, setRestList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	// const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		fetchRestaurants();
	}, []);

	const fetchRestaurants = (search = '') => {
		fetch(`http://13.52.182.209/search?search=${search}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => setRestList(data))
			.catch((error) => console.error('Error:', error));
	};

	const handleSearchSubmit = (search) => {
		setSearchValue(search);
		fetchRestaurants(search);
	};

	return (
		<div>
			This is Team 7 Home section.
			<div>
				<Search onSearchSubmit={handleSearchSubmit} searchValue={searchValue} />
			</div>
			<div>
				{restList.map((restaurant) => {
					return (
						<Card>
							<CardContent>
								<Card.Header>{restaurant.name_r}</Card.Header>
								<Card.Description>{restaurant.cuisine}</Card.Description>
								<Card.Description>{restaurant.status > 0 ? 'open' : 'close'}</Card.Description>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
