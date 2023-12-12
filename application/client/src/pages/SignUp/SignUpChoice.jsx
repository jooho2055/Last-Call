import React from 'react';
import { Link } from 'react-router-dom';
import BtnForRegister from '../../components/BtnForRegister';

export default function SignUpChoice() {
	return (
		<>
			<div className='max-w-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl font-medium text-center '>
				<div className='flex justify-between text-white'>
					<Link to={`/signup/customer`}>
						<BtnForRegister className='bg-primaryGrayBlue py-5 px-6 mr-10 text-lg rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-primary'>
							Customer Sign Up
						</BtnForRegister>
					</Link>

					<Link to={`/signup/restaurant`}>
						<BtnForRegister className='bg-primaryGrayBlue py-5 px-6 text-lg rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-primary'>
							Restaurant Sign Up
						</BtnForRegister>
					</Link>
				</div>
			</div>
		</>
	);
}
