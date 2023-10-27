import React from 'react';
import Search from '../components/Search';
import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
	const [restList, setRestList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	// const [searchResult, setSearchResult] = useState([]);

	const test = [
		{
			name: 'gen',
			cusine: 'korean',
			location: 'sunset',
			status: '1',
		},
		{
			name: 'mugubokka',
			cusine: 'korean',
			location: 'nycity',
			status: '1',
		},
		{
			name: 'pho 24',
			cusine: 'veitnamese',
			location: 'burchell ave',
			status: '1',
		},
		{
			name: 'san tung',
			cusine: 'chinese',
			location: 'charllet drive',
			status: '0',
		},
		{
			name: 'mc donald',
			cusine: 'american',
			location: 'oakland',
			status: '1',
		},
		{
			name: 'indianna',
			cusine: 'indian',
			location: 'busan',
			status: '0',
		},
		{
			name: 'showmen',
			cusine: 'chinese',
			location: 'seoul',
			status: '1',
		},
		{
			name: 'tacotatico',
			cusine: 'mexican',
			location: 'mxcity',
			status: '1',
		},
		{
			name: 'in-n-out',
			cusine: 'american',
			location: 'balboa',
			status: '0',
		},
		{
			name: 'miyakko',
			cusine: 'japanese',
			location: 'blossom hill',
			status: '0',
		},
		{
			name: 'paris buggget',
			cusine: 'bakery',
			location: 'daegu',
			status: '1',
		},
		{
			name: 'tour',
			cusine: 'bakery',
			location: 'busan',
			status: '1',
		},
	];

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
				{test.map((restaurant) => (
					<RestaurantCard restaurantInfo={restaurant} />
				))}
			</div>
		</div>
	);
}
