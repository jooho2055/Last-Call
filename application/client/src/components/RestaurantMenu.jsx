import React, { useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import AddToCartModal from './AddToCartModal';
import BtnForCustomer from './BtnForCustomer';

export default function RestaurantMenu({
	restarantmenuInfo,
	userInfo,
	restaurantKey,
	isOrderView = false,
}) {
	const { name, description, img_path, quantity, original_price, price } = restarantmenuInfo;

	// const [remainingCount, setRemainingCount] = useState(quantity);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = (e) => {
		setIsModalOpen(false);
	};

	if (isOrderView) {
		return (
			<li className='flex justify-between ml-5'>
				<span>
					- {name} [{quantity}]
				</span>
			</li>
		);
	}

	return (
		// lists of menu
		<li className=' flex justify-between rounded-xl shadow-[6.0px_9.0px_9.0px_rgba(0,0,0,0.30)] m-auto w-[36rem] sm:w-[33rem]'>
			<div className=' w-full flex'>
				<img
					src={`http://13.52.182.209${img_path}`}
					className='w-[16rem] h-[10rem] object-cover rounded-s-xl pr-2'
					alt='sample img'
				/>
				<div className='flex flex-col justify-between'>
					<div className='flex-1'>
						<div className='flex flex-col justify-between'>
							<span className='text-lg font-bold pl-1 pt-1'>{name}</span>
							<span className='text-sm pt-2 pr-3 pl-1'>
								Remaining Count: <strong>{quantity}</strong>
							</span>
						</div>

						<div className='text-sm text-gray-500 pl-1 pt-1 sx:hidden'>
							{description}
						</div>
					</div>
					<div className='pb-1 pl-1'>
						<div className='flex justify-between text-sm sx:flex-col'>
							<span>Original Price: </span>
							<span className='pr-5 line-through ml-5 sx:ml-0'>
								${original_price}
							</span>
						</div>
						<div className='flex justify-between text-sm sx:flex-col'>
							<span>Discounted Price: </span>
							<span className='pr-5 font-bold text-orange-700 ml-5 sx:ml-0'>
								${price}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='pl-3'>
				<BtnForCustomer onClick={openModal}>
					<BsCartPlus className='text-3xl mt-[3.75rem] mr-2' />
				</BtnForCustomer>
				<AddToCartModal
					isOpen={isModalOpen}
					onClose={closeModal}
					restaurantKey={restaurantKey}
					restarantmenuInfo={restarantmenuInfo}
					// setRemainingCount={setRemainingCount}
					userInfo={userInfo}
				/>
			</div>
		</li>
	);
}
