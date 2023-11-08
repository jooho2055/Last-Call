import React, { useState } from 'react';
import { inputForMenu } from '../../utils/resProfile';
import RestaurantMenu from '../../components/RestaurantMenu';
import { AiFillPlusSquare } from 'react-icons/ai';
import FormInput from '../../components/FormInput';

const foodlist = [
	{
		fname: 'apple',
		quantity: 2,
		oprice: 3,
		aprice: 2,
	},
	{
		fname: 'banana',
		quantity: 1,
		oprice: 2,
		aprice: 1,
	},
	{
		fname: 'rice',
		quantity: 3,
		oprice: 15,
		aprice: 10,
	},
];

export default function RestaurantMenutable() {
	const [menuInput, setMenuInput] = useState({
		fname: '',
		quantity: '',
		oprice: '',
		aprice: '',
	});

	const [menuvalidity, setmenuValidity] = useState({
		fail: true,
		quantity: true,
		oprice: true,
		aprice: true,
	});

	const [isOpen, setIsOpen] = useState(false);

	const formatShows = () => {
		setIsOpen(!isOpen);
	};

	const isMenuSubmitDisable =
		!Object.values(menuvalidity).every((isValid) => isValid) ||
		!Object.values(menuInput).every((value) => value);
	const validateMenuInput = (name, value) => {
		let isValid = true;
		switch (name) {
			case 'fname':
				isValid = /^[A-Za-z0-9]{1,16}$/.test(value);
				break;
			case 'quantity':
				isValid = /^[1-9]\d*$/.test(value);
				break;
			case 'oprice':
				isValid = /^[0-9]*\.?[0-9]+$/.test(value) && parseFloat(value) > 0;
				break;
			case 'aprice':
				isValid = /^[0-9]*\.?[0-9]+$/.test(value) && parseFloat(value) > 0;
				break;
			default:
				isValid = false;
		}
		setmenuValidity({ ...menuvalidity, [name]: isValid });
	};
	const handleMenu = (e) => {
		e.preventDefault();
		console.log(menuInput);
	};

	const onMenuChange = (e) => {
		const { name, value } = e.target;
		setMenuInput({ ...menuInput, [e.target.name]: e.target.value });
		validateMenuInput(name, value);
	};

	return (
		<div className='min-h-full m-auto flex justify-center bg-white relative'>
			<div className='absolute top-0 left-50'>
				<p>Menu Manage</p>
				<button
					className='text-3xl mt-[0.85rem] mr-5'
					onClick={formatShows} // Toggle the isOpen state when the button is clicked
				>
					<AiFillPlusSquare />
				</button>
				{isOpen && (
					<button
						onClick={formatShows}
						className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default'
					></button>
				)}
				{isOpen && (
					<div className='absolute right-50 w-72 h-96 bg-gray-100'>
						<p>Test</p>
						<form onSubmit={handleMenu}>
							{inputForMenu.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={menuInput[input.name]}
									onChange={onMenuChange}
									isValid={menuvalidity[input.name]}
								></FormInput>
							))}
							<button disabled={isMenuSubmitDisable}>Submit</button>
						</form>
					</div>
				)}
				<div className='grid grid-cols-1 gap-4'>
					{foodlist.map((food) => (
						<RestaurantMenu restarantmenuInfo={food} />
					))}
				</div>
			</div>
		</div>
	);
}
