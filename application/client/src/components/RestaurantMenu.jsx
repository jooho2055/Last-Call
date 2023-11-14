import React, { useState } from 'react';
import sampleFood from '../images/samplefood.png';
import { BsCartPlus } from 'react-icons/bs';
import CustomerButton from './CustomerButton';
import AddQuantityModal from './AddQuantityModal';

export default function RestaurantMenu({ restarantmenuInfo }) {
	const { name, description, img_path, quantity, original_price, price } = restarantmenuInfo;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = (e) => {
		setIsModalOpen(false);
	};

	return (
		// lists of menu
		<li className=' flex justify-between rounded-xl shadow-md m-auto'>
			<div className=' w-full flex'>
				<img
					src={sampleFood}
					className='max-w-[16rem] rounded-s-xl pr-2'
					alt='sample img'
				/>
				<div className='flex flex-col justify-between'>
					<div className='flex-1'>
						<div className='flex justify-between sm:flex-col'>
							<span className='text-lg font-bold pl-1 pt-1'>{name}</span>
							<span className='text-sm pt-2 pr-3 pl-1'>
								Remaining Count: <strong>{quantity}</strong>
							</span>
						</div>

						<div className='text-sm text-gray-500 pl-1 pt-1 sx:hidden'>
							The food is made by chicken asdfasdf asdfasdf asdfasdf
						</div>
					</div>
					<div className='pb-1 pl-1'>
						<div className='flex justify-between text-sm sx:flex-col'>
							<span>Original Price: </span>
							<span className='pr-5 line-through'>${original_price}</span>
						</div>
						<div className='flex justify-between text-sm sx:flex-col'>
							<span>Discounted Price: </span>
							<span className='pr-5 font-bold text-orange-700'> ${price}</span>
						</div>
					</div>
				</div>
			</div>

			<div className='pl-3'>
				<button onClick={openModal}>
					<BsCartPlus className='text-3xl mt-[3.75rem] mr-2' />
				</button>
				<AddQuantityModal
					isOpen={isModalOpen}
					onClose={closeModal}
					restarantmenuInfo={restarantmenuInfo}
				/>
			</div>
		</li>
	);
}
