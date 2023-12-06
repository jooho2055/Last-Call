import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchToggle({ isLoading, data }) {
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const navigate = useNavigate();

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'ArrowDown') {
				// Prevent default arrow key behavior (scrolling)
				event.preventDefault();
				// Move focus down in the list
				setFocusedIndex((prevIndex) => (prevIndex + 1) % data.length);
			} else if (event.key === 'ArrowUp') {
				// Prevent default arrow key behavior (scrolling)
				event.preventDefault();
				// Move focus up in the list
				setFocusedIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
			} else if (event.key === 'Enter' && focusedIndex >= 0) {
				// Navigate to the item's link
				const item = data[focusedIndex];
				navigate(`/restaurant/${item.id}`);
			}
		};

		console.log('move!!!');
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [data, focusedIndex, navigate]);

	return (
		<div className='absolute w-96'>
			<div className='relative flex flex-col px-4 py-2 bg-gray-100 divide-y divide-gray-300 rounded-b-lg rounded-t-md'>
				{isLoading && <div className='text-white'>Loading...</div>}
				{data &&
					data.map((item, index) => (
						<Link
							to={`/restaurant/${item.id}`}
							key={item.id}
							onMouseDown={(e) => {
								// Prevent default to stop the input from losing focus
								e.preventDefault();
							}}
							className={`w-full text-stone-900 rounded-sm px-2 pt-2 ${
								index === focusedIndex ? 'bg-gray-300' : ''
							}`}
						>
							<div className='pb-2 flex justify-between w-full'>
								<div>{item.name}</div>
								<div>{item.status}</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}
