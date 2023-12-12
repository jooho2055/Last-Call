import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lastcall from '../images/landinglogosvg.svg';
import BtnForCustomer from '../components/BtnForCustomer';

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
					<p className='text-3xl mt-10 md:text-3xl'>
						Grab Delicious Deals, Prevent Waste, and Savor Sustainability
					</p>
				</div>
				<div className='mt-16 space-x-8 md:mt-12'>
					<Link to={'/signin'}>
						<BtnForCustomer className='bg-stone-100 text-lg px-6 py-2.5 rounded-xl text-stone-900 font-medium hover:bg-stone-200'>
							Sign In
						</BtnForCustomer>
					</Link>
					<Link to={'signup'}>
						<BtnForCustomer className='bg-primary text-lg px-6 py-2.5 rounded-xl text-stone-50 font-medium hover:bg-primaryVariant'>
							Sign Up
						</BtnForCustomer>
					</Link>
				</div>
			</section>
		</div>
	);
}
