import React, { useState } from 'react';

export default function Searchbox({ setSearchValue, onSubmit }) {
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
	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div>
			<div className='w-full justify-center flex'>
				<form onSubmit={onSubmit}>
					<input
						className='border-gray-300 border rounded-lg py-1 px-3 w-96'
						type='text'
						placeholder='Search...'
						onChange={handleChange}
					/>
				</form>
			</div>
		</div>
	);
}
