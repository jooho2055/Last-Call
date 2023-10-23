import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpChoice() {
	return (
		<div className='container max-w-xl m-auto text-center rounded-lg bg-slate-500 p-12'>
			<h1 className='text-3xl font-semibold text-black py-8'>here is sign up choice page</h1>
			<div className='flex justify-between text-white'>
				<Link to={`/signup/customer`}>
					<button className='bg-black p-3 px-6 rounded text-center'>to customerSignup</button>
				</Link>

				<Link to={`/signup/restaurant`}>
					<button className='bg-black p-3 px-6 rounded text-center'>to restSignup</button>
				</Link>
			</div>
		</div>
	);
}
