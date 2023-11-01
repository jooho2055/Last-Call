import React from 'react';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import SearchBox from '../components/SearchBox';
import RestaurantList from '../components/RestaurantList';
import { useSelector } from 'react-redux';

export default function CustomerHome() {
	// const [restList, setRestList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!user.isLoggedIn) {
			navigate('/signin');
		}
		if (user.role === 'restaurants') {
			navigate('/restaurantprofile');
		}
	}, []);

	const fetchRestaurants = async () => {
		try {
			const response = await axios.get(`http://13.52.182.209/search?search=${searchValue}`);
			return response.data;
		} catch (error) {
			console.error('Error fetching restaurants:', error);
			throw error;
		}
	};
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
		console.log(searchValue);
		setSearchValue('');
		navigate(`/search/${searchValue}`);
	};

	// const handleSearchSubmit = (search) => {
	// 	setSearchValue(search);
	// 	fetchRestaurants(search);
	// };

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<div>
			This is Team 7 Home section.
			<div>
				<SearchBox
					// onSearchSubmit={handleSearchSubmit}
					setSearchValue={setSearchValue}
					onSubmit={handleSubmit}
				/>
			</div>
			<div className='grid grid-cols-3 auto-rows-[minmax(14rem,auto)] p-6 gap-6'>
				{restaurants.map((restaurant, index) => (
					<RestaurantList key={index} restaurantInfo={restaurant} /> // must use restaurant unique id as key in the future
				))}
			</div>
		</div>
	);
}
