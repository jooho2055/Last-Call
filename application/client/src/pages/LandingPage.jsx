import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lastcall from '../images/landinglogosvg.svg';

export default function LandingPage() {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (user.isLoggedIn) {
			console.log(user.role === 'restaurants');
			if (user.role === 'restaurants') {
				navigate('/restaurantprofile');
			} else {
				navigate('/home');
			}
		}
	});
	return (
		<div className='min-h-full m-auto bg-landingpagebg bg-cover bg-no-repeat bg-right-bottom flex text-gray-50'>
			<section className='flex flex-col flex-1 items-center justify-center '>
				<div className='flex flex-col items-center justify-between w-full max-h-96'>
					<div>
						<img src={lastcall} alt='Logo' className='w-[35rem] sm:w-[20rem]' />
					</div>
					<p className='text-3xl mt-10 md:text-3xl'>Avoid Food Waste and Save money</p>
				</div>
				<div className='mt-16 space-x-8 md:mt-12'>
					<Link to={'/signin'}>
						<button className='bg-stone-900 text-lg px-6 py-2.5 rounded-2xl'>
							Sign In
						</button>
					</Link>
					<Link to={'signup'}>
						<button className='bg-stone-900 text-lg px-6 py-2.5 rounded-2xl'>
							Sign Up
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
}
