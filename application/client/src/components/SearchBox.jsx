// import axios from 'axios';

import useDebounce from '../hooks/useDebounce';
import SearchToggle from './SearchToggle';

import { fetchSearchboxRestaurants } from '../apis/get';
import { useQuery } from '@tanstack/react-query';

export default function Searchbox({ searchValue, onSubmit, onChange }) {
	// Use custom hook for debounced search term
	const debouncedSearchTerm = useDebounce(searchValue, 700);

	// QueryFn will pass 'search' as a parameter, must use arrow function
	// The key is different from the key in Home page.
	const { isLoading, data: searchedRestaurants } = useQuery({
		queryKey: ['searchedRestaurants', debouncedSearchTerm],
		queryFn: () => fetchSearchboxRestaurants(searchValue),
		enabled: !!searchValue,
	});

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<div>
			<div className='w-full justify-center flex'>
				<form onSubmit={onSubmit}>
					<input
						className='border-gray-300 border rounded-lg py-1 px-3 w-96'
						type='text'
						value={searchValue}
						placeholder='Search...'
						onChange={handleChange}
					/>
					{searchValue && (
						<SearchToggle isLoading={isLoading} data={searchedRestaurants} />
					)}
				</form>
			</div>
		</div>
	);
}
