import React from 'react';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../apis/get';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import SearchBox from '../components/SearchBox';
import RestaurantList from '../components/RestaurantList';

export default function CustomerHome() {

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
	});


	const {
		isLoading,
		error,
		data: restaurants,
	} = useQuery({
		// use query to fetch data from DB, the key is different from the key in search box
		queryKey: ['restaurants'],
		queryFn: fetchRestaurants,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search/${searchValue}`);
	};

	const handleChange = (value) => {
		setSearchValue(value);
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<div className='max-w-[110rem] m-auto mt-10'>
			<div>
				<SearchBox
					searchValue={searchValue}
					onSubmit={handleSubmit}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-3 auto-rows-[minmax(14rem,auto)] p-7 gap-8'>
				{/* Must use a restaurant unique id as a key in the future */}
				{restaurants.map((restaurant, index) => (
					<RestaurantList key={index} restaurantInfo={restaurant} />
				))}
			</div>
		</div>
	);
}
