import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import SearchResult from './SearchResult';
import { fetchSearchboxRestaurants } from '../apis/get';

export default function Searchbox({ searchValue, onSubmit, onChange }) {
	// const clicked = (event) => {
	// 	event.preventDefault();
	// 	fetch(`http://13.52.182.209/search?search=${searchValue}`, {
	// 		method: 'GET',
	// 	})
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => setSearchValue(data))
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };
	// const handleChange = (e) => {
	// 	setSearchValue(e.target.value);
	// };

	const [search, setSearch] = useState('');
	const debouncedSearchTerm = useDebounce(search, 700);

	// const { isLoading, data: restaurants } = useQuery({
	// 	queryKey: ['restaurants', debouncedSearchTerm],
	// 	queryFn: async () => {
	// 		try {
	// 			console.log('fetching');
	// 			const response = await axios.get(`http://13.52.182.209/search?search=${search}`);

	// 			const restName = response.data.map((restaurant) => restaurant.name);
	// 			// console.log(restName);
	// 			// console.log(response);
	// 			// console.log(response.data);

	// 			return response.data;
	// 		} catch (error) {
	// 			console.error('Error fetching restaurants:', error);
	// 			throw error;
	// 		}
	// 	},
	// 	// Ensure to only refetch when the searchValue changes
	// 	// enabled: searchValue !== '',
	// });

	const { isLoading, data: searchedRestaurants } = useQuery({
		queryKey: ['searchedRestaurants', debouncedSearchTerm],
		queryFn: () => fetchSearchboxRestaurants(search),
	});

	const handleChange = (e) => {
		const newSearch = e.target.value;
		setSearch(newSearch);
		onChange(newSearch);
		// console.log(search);
	};

	return (
		<div>
			<div className='w-full justify-center flex'>
				<form onSubmit={onSubmit}>
					<input
						className='border-gray-300 border rounded-lg py-1 px-3 w-96'
						type='text'
						value={search}
						placeholder='Search...'
						onChange={handleChange}
					/>
					{search && <SearchResult isLoading={isLoading} data={searchedRestaurants} />}
				</form>
			</div>
		</div>
	);
}
