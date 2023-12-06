import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../redux/userActions';

export default function Dropdown() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const user = useSelector((state) => state.user);
	const [restaurant, setRestaurant] = useState(false);
	useEffect(() => {
		if (user.role === 'restaurants') {
			console.log('true');
			setRestaurant(true);
		} else {
			setRestaurant(false);
		}
	}, [user.role]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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
		<div className='relative font-medium'>
			<button className='text-3xl mt-5 mr-6 text-stone-900' onClick={toggleDropdown}>
				<AiOutlineUser />
			</button>
			{isDropdownOpen && (
				<button
					onClick={toggleDropdown}
					className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default'
				></button>
			)}
			{isDropdownOpen && (
				<div className='absolute right-0 mt-2 py-2 mr-4 w-40 bg-slate-200 rounded-lg shadow-xl'>
					{!restaurant && (
						<Link
							to='/customer/profile'
							href='#'
							className='block px-4 py-2 text-gray-800 hover:bg-orange-400 hover:text-white text-center'
						>
							Profile
						</Link>
					)}
					{restaurant && (
						<Link
							to='/restaurant/profile'
							href='#'
							className='block px-4 py-2 text-gray-800 hover:bg-orange-400 hover:text-white text-center'
						>
							Profile
						</Link>
					)}
					<Link
						href='#'
						className='block px-4 py-2 text-gray-800 hover:bg-orange-400 hover:text-white text-center'
						onClick={handleSignOut}
					>
						Sign Out
					</Link>
				</div>
			)}
		</div>
	);
}
