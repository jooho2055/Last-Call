import React, { useEffect, useState } from 'react';

export default function AddQuantityModal({ isOpen, onClose, restarantmenuInfo }) {
	const { name, quantity, original_price, price } = restarantmenuInfo;

	const [quantityUserSelect, setQuantityUserSelect] = useState('1');

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'; // Disables scrolling
		} else {
			document.body.style.overflow = 'auto'; // Enables scrolling
		}
	}, [isOpen]);

	const handleQuantityChange = (e) => {
		const selectedQuantity = Math.max(1, Math.min(Number(e.target.value), quantity));
		setQuantityUserSelect(selectedQuantity);
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
			<div className='flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-100 w-96 h-96 rounded-3xl shadow-2xl'>
				<div className='pl-5 flex flex-col'>
					<div className='text-2xl font-medium mt-5'>{name}</div>
					<div className='mt-3'>
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
					<div className='mt-5'>
						You can select the item up to <strong>{quantity}</strong>
					</div>
					<div className='text-center mt-2'>
						<label htmlFor='quantity'>Quantity: </label>
						<input
							type='number'
							id='quantity'
							name='quantity'
							value={quantityUserSelect}
							onChange={handleQuantityChange}
							min='1'
							max={quantity}
							className='border rounded pl-2 py-1'
						/>
					</div>
					<div className='mt-6 flex justify-between'>
						<span className='pt-1'>Total Price : </span>{' '}
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
