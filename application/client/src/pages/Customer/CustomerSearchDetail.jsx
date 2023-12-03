import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchSearchboxRestaurants } from '../../apis/get';
import sampleFood from '../../images/samplefood.png';

import Searchbox from '../../components/SearchBox';
import RestaurantList from '../../components/RestaurantList';

export default function CustomerSearchDetail() {
	const [searchValue, setSearchValue] = useState('');
	const inputRef = useRef(null); // Create the ref

	const { searchId } = useParams();
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

	useEffect(() => {
		if (searchId && searchValue !== searchId) {
			setSearchValue(searchId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchId]);

	const { data: searchedRestaurants } = useQuery({
		queryKey: ['searchedRestaurants', searchId],
		queryFn: () => fetchSearchboxRestaurants(searchId),
		enabled: !!searchId,
		keepPreviousData: true,
		staleTime: 100000,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// setSearchValue('');
		if (inputRef.current) {
			inputRef.current.blur(); // Remove focus from the input box
		}
		navigate(`/search/${searchValue}`);
	};

	const handleChange = (value) => {
		setSearchValue(value);
	};

	return (
		<div className='max-w-[90rem] m-auto mt-10 px-24 custom1175:px-10 custom1050:px-10'>
			<div className='mb-10'>
				<h1 className='font-medium text-lg'>Search Results</h1>
				<p className='font-medium'>
					Displaying results for the search query: <strong>"{searchId}"</strong>
				</p>
			</div>
			<div>
				<Searchbox
					searchValue={searchValue}
					onSubmit={handleSubmit}
					onChange={handleChange}
					inputRef={inputRef}
				/>
			</div>
			<div className='grid grid-cols-3 pt-12 gap-12 custom1050:grid-cols-2 customHome:gap-x-0 custom1050:px-10 custom850:px-0 custom720:grid-cols-1'>
				{/* Must use a restaurant unique id as a key in the future */}
				{searchedRestaurants?.map((restaurant, index) => (
					<Link
						to={`/restaurant/${restaurant.id}`}
						className='flex flex-col w-[20rem] h-[16.75rem] justify-center items-center text-lg rounded-xl shadow-md mx-auto'
						key={restaurant.id}
					>
						<img
							src={sampleFood}
							alt='sample Food'
							className='w-[20rem] h-[12.5rem] rounded-t-lg'
						/>
						<RestaurantList key={index} restaurantInfo={restaurant} />
					</Link>
				))}
			</div>
			<br></br>
		</div>
	);
}
