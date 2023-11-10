import React from 'react';
import sampleFood from '../images/samplefood.png';

export default function RestaurantMenu({ restarantmenuInfo }) {
	const { name, description, img_path, quantity, original_price, price } = restarantmenuInfo;
	return (
		<li className='border-gray-800 border-2 flex justify-between max-w-[110rem] m-auto mt-10 p-5'>
			<div className='border-x-teal-700 min-w-min w-full border-2 flex'>
				<img src={sampleFood} className='mr-12' alt='sample img' />
				<div className='flex flex-1 justify-between m-full pt-24'>
					<div>{name}</div>
					<div>The food is made by chicken</div>
					<div>{quantity}</div>
					<div>{original_price}</div>
					<div>{price}</div>
				</div>
			</div>
			<button className='mr-12'>Add Cart</button>
		</li>
	);
}
