import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSearchboxRestaurants } from '../apis/get';

import Searchbox from '../components/SearchBox';
import RestaurantList from '../components/RestaurantList';

export default function SearchDetail() {
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
		if (searchId && searchValue !== searchId) {
			setSearchValue(searchId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchId]);

	const { data: searchedRestaurants } = useQuery({
		queryKey: ['searchedRestaurants', searchId],
		queryFn: () => fetchSearchboxRestaurants(searchId),
		enabled: !!searchId,
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
		<div className='max-w-[110rem] m-auto mt-10'>
			<div>
				<h1>Search Results {searchValue}</h1>
				<p>
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
			<div className='grid grid-cols-3 auto-rows-[minmax(14rem,auto)] p-7 gap-8'>
				{/* Must use a restaurant unique id as a key in the future */}
				{searchedRestaurants?.map((restaurant, index) => (
					<RestaurantList key={index} restaurantInfo={restaurant} />
				))}
			</div>
		</div>
	);
}
