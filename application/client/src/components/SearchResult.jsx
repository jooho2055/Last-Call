import React from 'react';

export default function SearchResult({ isLoading, data }) {
	return (
		<div className='absolute w-96'>
			<div className='relative flex flex-col px-4 py-2  w-full bg-gray-100 divide-y divide-gray-300'>
				{isLoading && <div className='text-white'>Loading...</div>}
				{/* The data is an array that holds restaurants information */}
				{data &&
					data.map((item) => (
						<div key={item.id} className='text-stone-900 pb-1 flex justify-between'>
							<div>{item.name}</div>
							<div>{item.status}</div>
						</div>
					))}
			</div>
		</div>
	);
}
