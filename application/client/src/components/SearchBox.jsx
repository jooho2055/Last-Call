import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import SearchResult from './SearchResult';
import { fetchSearchboxRestaurants } from '../apis/get';

export default function Searchbox({ onSubmit, onChange }) {
	const [search, setSearch] = useState('');
	// Use custom hook for debounced search term
	const debouncedSearchTerm = useDebounce(search, 700);

	// QueryFn will pass 'search' as a parameter, must use arrow function
	// The key is different from the key in Home page.
	const { isLoading, data: searchedRestaurants } = useQuery({
		queryKey: ['searchedRestaurants', debouncedSearchTerm],
		queryFn: () => fetchSearchboxRestaurants(search),
		enabled: !!search,
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
