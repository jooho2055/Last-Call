import React from 'react';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../../apis/get';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import SearchBox from '../../components/SearchBox';
import RestaurantList from '../../components/RestaurantList';

export default function CustomerHome() {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	console.log(user);

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
		staleTime: 120000,
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
		<div className='max-w-[90rem] m-auto mt-10 px-24 custom1175:px-10 custom1050:px-10'>
			<SearchBox searchValue={searchValue} onSubmit={handleSubmit} onChange={handleChange} />

			<div className='grid grid-cols-3 pt-12 gap-12 custom1050:grid-cols-2 customHome:gap-x-0 custom1050:px-10 custom850:px-0 custom720:grid-cols-1'>
				{/* Must use a restaurant unique id as a key in the future */}
				{restaurants.map((restaurant) => (
					<Link
						to={`/restaurant/${restaurant.id}`}
						className='flex flex-col w-[20rem] h-[16.75rem] justify-center items-center text-lg rounded-xl shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] mx-auto'
						key={restaurant.id}
					>
						<img
							src={`http://13.52.182.209${restaurant.img_path}`}
							alt='sample Food'
							className='w-[20rem] h-[12.5rem] rounded-t-lg object-cover'
						/>
						<RestaurantList restaurantInfo={restaurant} />
					</Link>
				))}
			</div>
			<br />
		</div>
	);
}
