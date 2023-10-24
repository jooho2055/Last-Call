import React from 'react';
import landingpage from '../images/landingpage.jpg';
import Order from './Order';

export default function LandingPage() {
	return (
		<div className='container m-auto bg-landingpagebg bg-center'>
			<section className='flex flex-1 items-center justify-center'>
				<div className='flex flex-col items-center justify-between'>
					<h1 className='text-5xl'>Last Call</h1>
					<p className='text-2xl mt-16'>Avoid food waste and Save money</p>
				</div>
			</section>
			<Order />
		</div>
	);
}
