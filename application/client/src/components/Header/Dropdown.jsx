import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../redux/userActions';

export default function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSignOut = async () => {
		const res = await fetch('http://13.52.182.209/users/signout', {
			method: 'GET',
			headers: {
				'content-Type': 'application/json',
			},
		}).then((res) => {
			if (res.ok && user.isLoggedIn) {
				dispatch(logout());
				navigate('/');
			}
		});
		console.log(res);
	};
	return (
		<div className='relative'>
			<button className='text-3xl mt-[0.85rem] mr-5' onClick={toggleDropdown}>
				<AiOutlineUser />
			</button>
			{isOpen && (
				<button
					onClick={toggleDropdown}
					className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default'
				></button>
			)}
			{isOpen && (
				<div className='absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-lg shadow-xl'>
					<Link
						to='/customer/profile'
						href='#'
						className='block px-4 py-2 text-gray-800 hover:bg-orange-400 hover:text-white'
					>
						Profile
					</Link>
					<button
						href='#'
						className='block px-4 py-2 text-gray-800 hover:bg-orange-400 hover:text-white'
						onClick={handleSignOut}
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
}
