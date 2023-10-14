import React from 'react';

export default function Search({ onSearchSubmit, searchValue }) {
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
		onSearchSubmit(e.target.value);
	};
	return (
		<div>
			<div className='w-full justify-center flex'>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						className='border-gray-300 border rounded-lg py-1 px-3 w-96'
						type='text'
						placeholder='Search...'
						value={searchValue}
						onChange={handleChange}
					/>
					{/* <button type='submit' className='w-5'>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg'
							alt='searchingico'
						/>
					</button> */}
				</form>
			</div>
		</div>
	);
}
