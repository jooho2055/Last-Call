import { useEffect, useState } from 'react';

/**
 * Custom hook for search box
 * The hook is to prevent multiple tries of fetching whenever a user input a data in input box
 * It will wait about (delay) seconds (ms) after user is done with putting data in the box
 * Then it will fetch data.
 * @param value search value
 * @param delay time delay
 */

export default function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
