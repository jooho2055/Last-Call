import React from 'react';
import { useState } from 'react';

export default function CartMenu({ CartMenuInfo }) {
	const { name, description, img_path, quantity, original_price, price, restaurant } =
		CartMenuInfo;
	const [quantityUserSelect, setQuantityUserSelect] = useState(quantity);

	const handleDecrement = () => {
		if (1 < quantityUserSelect) {
			setQuantityUserSelect((prev) => prev - 1);
		}
	};

	const handleIncrement = () => {
		if (quantityUserSelect < quantity) {
			setQuantityUserSelect((prev) => prev + 1);
		}
	};
	return (
		<li className='flex justify-between shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] rounded-lg'>
			<div className='flex'>
				<div className='relative'>
					<img
						src={`http://13.52.182.209${img_path}`}
						className='w-72	h-44 min-w-[18rem] rounded-l-lg ' // Adjusted classes
						alt='sample img'
					/>
					<div className='absolute px-5 inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-0 hover:bg-opacity-50 hover:rounded-l-lg'>
						<p className='text-white text-center'>
							The food is made by chicken asdfasdf asdfasdf asdfasdf
						</p>
					</div>
				</div>

				<div className='pl-3 min-w-[15rem] flex flex-col justify-between pr-10'>
					<div className='flex flex-col font-medium'>
						<span className='text-xl'>{restaurant}</span>
						<span className='mt-2 text-lg'>{name}</span>
					</div>
					<div className='pb-10 pl-10'>
						<span className='block mb-1'>Discounted Price: </span>
						<span className='line-through mr-1 ml-6'>{original_price}</span>
						<span className='font-bold text-orange-700'>
							={'>'} ${price}
						</span>
					</div>
				</div>
			</div>

			<div className='text-center flex justify-center items-center mr-10'>
				<span className='mr-5 font-medium'>Quantity: </span>
				<button className='border-y-2 h-7 w-7 bg-stone-300' onClick={handleDecrement}>
					-
				</button>
				<div className='border-2 h-7 w-7 font-bold'>{quantityUserSelect}</div>
				<button className='border-y-2 h-7 w-7 bg-stone-300' onClick={handleIncrement}>
					+
				</button>
			</div>
			<button className='bg-primary mr-14 my-[4.30rem] px-3 rounded-lg text-stone-100 font-medium'>
				Delete
			</button>
		</li>
	);
}
