import React, { useEffect, useState } from 'react';

export default function AddQuantityModal({ isOpen, onClose, restarantmenuInfo }) {
	const { name, quantity, original_price, price } = restarantmenuInfo;

	const [quantityUserSelect, setQuantityUserSelect] = useState(1);

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

	const calculateDiscounted = (originalPrice, discountedPrice) => {
		const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
		return discountPercent;
	};

	const calculatedTotalPrice = (price, quantity) => {
		const totalPrice = price * quantity;
		return totalPrice.toFixed(2);
	};

	const discountPercent = calculateDiscounted(original_price, price);
	const totalPrice = calculatedTotalPrice(price, quantityUserSelect);

	if (!isOpen) {
		return null;
	}
	return (
		<div>
			{/* Overlay */}
			<div className='fixed inset-0 bg-gray-600 bg-opacity-60'></div>

			{/* Modal */}
			<div className='flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-100 w-96 h-96 rounded-3xl shadow-2xl sx:h-60 sx:overflow-y-auto'>
				<div className='flex flex-col'>
					<div className='text-2xl font-medium mt-5 pl-5'>{name}</div>
					<div className='mt-3 pl-5'>
						<div>
							<span>Original Price: </span>
							<span className='line-through'>$ {original_price}</span>
						</div>
						<div>
							<span>Discounted Price: </span>
							<span className='text-orange-700'>
								<strong>$ {price}</strong>
							</span>
						</div>
					</div>
					<div className='text-orange-700 font-medium mt-5 text-xl text-center'>
						<strong>{discountPercent}</strong> % OFF DEALS
					</div>
					<div className='mt-5 pl-5'>
						You can select the item up to <strong>{quantity}</strong>
					</div>
					<div className='text-center mt-5 flex justify-center'>
						<span className='mr-5 font-medium'>Quantity: </span>
						<button className='border-y-2 w-7 bg-stone-300' onClick={handleDecrement}>
							-
						</button>
						<div className='border-2 w-10 font-bold'>{quantityUserSelect}</div>
						<button className='border-y-2 w-7 bg-stone-300' onClick={handleIncrement}>
							+
						</button>
					</div>
					<div className='mt-6 flex justify-between'>
						<span className='pt-1 pl-5'>Total Price : </span>
						<span className='mr-10 text-2xl'>
							<strong>$ {totalPrice}</strong>
						</span>
					</div>
				</div>

				<button
					className='bg-primary rounded-3xl mb-4 mx-4 font-medium p-3 text-lg text-gray-50'
					onClick={onClose}
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
}
