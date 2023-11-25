import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../../apis/get';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import sampleFood from '../../images/samplefood.png';
import SearchBox from '../../components/SearchBox';
import RestaurantList from '../../components/RestaurantList';

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
		<div className='max-w-[90rem] m-auto mt-10'>
			<SearchBox searchValue={searchValue} onSubmit={handleSubmit} onChange={handleChange} />

			<div className='grid grid-cols-3 auto-rows-[minmax(12rem,auto)] px-32 pt-12 gap-7 md:grid-cols-2 sm:grid-cols-1'>
				{/* Must use a restaurant unique id as a key in the future */}
				{restaurants.map((restaurant) => (
					<Link
						to={`/restaurant/${restaurant.id}`}
						className='flex flex-col justify-center items-center text-lg rounded-xl shadow-md'
						key={restaurant.id}
					>
						<img src={sampleFood} alt='sample Food' className='rounded-xl' />
						<RestaurantList restaurantInfo={restaurant} />
					</Link>
				))}
			</div>
			<br />
		</div>
	);
}
