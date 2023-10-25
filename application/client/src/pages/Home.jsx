import React from 'react';
import Search from '../components/Search';
import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

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
			<div className='h-full flex flex-col justify-center items-center '>
				{restList.map((restaurant) => (
					<RestaurantCard restaurantInfo={restaurant} />
				))}
			</div>
		</div>
	);
}
