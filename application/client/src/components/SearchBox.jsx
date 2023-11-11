// import axios from 'axios';

import useDebounce from '../hooks/useDebounce';
import SearchToggle from './SearchToggle';

import { fetchSearchboxRestaurants } from '../apis/get';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchBox({ searchValue, onSubmit, onChange, inputRef }) {
	// Use custom hook for debounced search term
	const debouncedSearchTerm = useDebounce(searchValue, 700);
	const [isInputFocused, setInputFocused] = useState(false);

	// QueryFn will pass 'search' as a parameter, must use arrow function
	// The key is different from the key in Home page.
	const { isLoading, data: searchedSuggestions } = useQuery({
		queryKey: ['searchedSuggestions', debouncedSearchTerm],
		queryFn: () => fetchSearchboxRestaurants(debouncedSearchTerm),
		enabled: !!debouncedSearchTerm && isInputFocused,
	});

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	const handleFocus = () => {
		setInputFocused(true); // Set focus state to true when input is focused
	};

	const handleBlur = () => {
		setInputFocused(false); // Set focus state to false when input loses focus
	};

	return (
		<div className='w-full justify-center flex'>
			<form onSubmit={onSubmit}>
				<input
					className='border-gray-300 border rounded-lg py-1 px-3 w-96'
					type='text'
					value={searchValue}
					placeholder='Search...'
					onChange={handleChange}
					ref={inputRef}
					onFocus={handleFocus} // Event handler for when the input receives focus
					onBlur={handleBlur}
				/>
				{searchValue && isInputFocused && (
					<SearchToggle isLoading={isLoading} data={searchedSuggestions} />
				)}
			</form>
		</div>
	);
}
