import React from 'react';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { test } from '../utils/formConfig';

import SearchBox from '../components/SearchBox';
import RestaurantList from '../components/RestaurantList';
import { useSelector } from 'react-redux';

export default function CustomerHome() {
	const user = useSelector((state)=>(state.user));
	const navigate = useNavigate();

	const [restList, setRestList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	
	useEffect(() => {
		if(!user.isLoggedIn){
			navigate('/signin')
		}
		if(user.role === 'restaurants'){
			navigate('/restaurantprofile')
		}
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
				{test.map((restaurant, index) => (
					<RestaurantList key={index} restaurantInfo={restaurant} /> // must use restaurant unique id as key in the future
				))}
			</div>
		</div>
	);
}
