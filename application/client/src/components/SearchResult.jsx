import React from 'react';

export default function SearchResult({ isLoading, data }) {
	return (
		<div className='flex flex-col px-4 py-2 items-center w-full bg-gray-500 divide-y divide-gray-300'>
			{isLoading && <div className='text-white'>Loading...</div>}
			{data &&
				data.map((item) => (
					<div key={item.id} className='text=gray-100'>
						{item.name}
					</div>
				))}
		</div>
	);
}
