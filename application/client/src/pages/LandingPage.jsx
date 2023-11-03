import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LandingPage() {
	const user = useSelector((state)=>(state.user))
	const navigate = useNavigate();
	useEffect(() => {
		if(user.isLoggedIn){
			console.log(user.role === 'restaurants')
			if(user.role === 'restaurants'){
				navigate('/restaurantprofile')
			}else{
				navigate("/home")
			}
		}
	}, []);
	return (
		<div className='min-h-full m-auto bg-landingpagebg bg-cover bg-no-repeat bg-right-bottom flex text-gray-50'>
			<section className='flex flex-col flex-1 items-center justify-center '>
				<div className='flex flex-col items-center justify-between'>
					<h1 className='text-9xl mb-10 md:text-6xl md:mb-6'>
						<strong>LAST CALL</strong>
					</h1>
					<p className='text-5xl md:text-3xl'>Avoid Food Waste and Save money</p>
				</div>
				<div className='mt-24 space-x-8 md:mt-16'>
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
