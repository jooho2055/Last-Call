import React from 'react';
// import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../apis/get';
import { useQuery } from '@tanstack/react-query';

import SearchBox from '../components/SearchBox';
import RestaurantList from '../components/RestaurantList';
import { useSelector } from 'react-redux';

export default function CustomerHome() {
	// const [restList, setRestList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	// const fetchFunction = () => {
	// 	console.log('Fetching restaurants with search:', searchValue);
	// 	return fetchRestaurants(searchValue);
	// };

	// const fetchRestaurants = async () => {
	// 	try {
	// 		const response = await axios.get(`http://13.52.182.209/search?search=${searchValue}`);
	// 		console.log('fetching....');
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error('Error fetching restaurants:', error);
	// 		throw error;
	// 	}
	// };

	// const {
	// 	isLoading,
	// 	error,
	// 	data: restaurants,
	// } = useQuery({
	// 	queryKey: ['restaurants', searchValue],
	// 	queryFn: async () => {
	// 		try {
	// 			console.log('fetching');
	// 			const response = await axios.get(
	// 				`http://13.52.182.209/search?search=${searchValue}`
	// 			);
	// 			return response.data;
	// 		} catch (error) {
	// 			console.error('Error fetching restaurants:', error);
	// 			throw error;
	// 		}
	// 	},
	// 	// Ensure to only refetch when the searchValue changes
	// 	// enabled: searchValue !== '',
	// });

	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!user.isLoggedIn) {
			navigate('/signin');
		}
		if (user.role === 'restaurants') {
			navigate('/restaurantprofile');
		}
	}, []);

	const {
		isLoading,
		error,
		data: restaurants,
	} = useQuery({
		queryKey: ['restaurants'],
		queryFn: fetchRestaurants,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search/${searchValue}`);
	};

	const handleChange = (value) => {
		setSearchValue(value);
		// console.log(value);
	};

	// const handleChange = (e) => {
	// 	setSearchValue(e.target.value);
	// 	console.log(searchValue);
	// };

	// const handleSearchSubmit = (search) => {
	// 	setSearchValue(search);
	// 	fetchRestaurants(search);
	// };

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<div className='max-w-[110rem] m-auto mt-10'>
			<div>
				<SearchBox
					// onSearchSubmit={handleSearchSubmit}
					// setSearchValue={setSearchValue}
					searchValue={searchValue}
					onSubmit={handleSubmit}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-3 auto-rows-[minmax(14rem,auto)] p-7 gap-8'>
				{restaurants.map((restaurant, index) => (
					<RestaurantList key={index} restaurantInfo={restaurant} /> // must use restaurant unique id as key in the future
				))}
			</div>
		</div>
	);
}
