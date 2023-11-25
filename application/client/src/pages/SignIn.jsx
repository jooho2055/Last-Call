import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputsForSignIn } from '../utils/formConfig';
import FormInput from '../components/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userActions';
import FooterForLogin from '../components/FooterForLogin';
import BtnForRegister from '../components/BtnForRegister';

export default function SignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		if (user.isLoggedIn) {
			if (user.role === 'restaurant') {
				navigate('/restaurantprofile');
			} else {
				navigate('/home');
			}
		}
	});
	const [inputValues, setInputValues] = useState({
		username: '',
		pwd: '',
		loginas: 'customer',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(inputValues);
		const res = await fetch('http://13.52.182.209/users/signin', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json',
			},
			body: JSON.stringify(inputValues),
		});
		const data = await res.json();
		dispatch(login(data));
		if (data.role === 'customers') {
			navigate('/home');
		} else if (data.role === 'restaurants') {
			navigate('/restaurantprofile');
		} else {
			console.log(data.message);
			console.log('something wrong!');
		}
	};

	const onChange = (e) => {
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
		console.log(inputValues);
	};

	const handleCheckbox = (e) => {
		if (e.target.checked) {
			setInputValues({ ...inputValues, loginas: 'restaurant' });
		} else {
			setInputValues({ ...inputValues, loginas: 'customer' });
		}
	};
	return (
		<>
			<div className='px-14 py-2 max-w-md bg-stone-100 rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] font-medium m-auto'>
				<form
					onSubmit={handleSubmit}
					className='h-[28rem] w-[20rem] rounded-3xl flex flex-col m-auto '
				>
					<h1 className='text-3xl text-center mt-4 mb-6'>Sign In</h1>
					{inputsForSignIn.map((input) => (
						<FormInput
							key={input.id}
							value={inputValues[input.name]}
							onChange={onChange}
							classNameForLabel='pl-1 mb-1 text-lg'
							classNameForInput='rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md'
							{...input}
						/>
					))}

					<div className='mt-6 mb-6'>
						<div className='relative inline-block w-10 mr-2 align-middle select-none'>
							<input
								type='checkbox'
								id='roleSwitch'
								onChange={handleCheckbox}
								className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
							/>
							<label
								htmlFor='roleSwitch'
								className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'
							></label>
						</div>
						<label htmlFor='roleSwitch' className='text-stone-800'>
							Signing in as a Restaurant Owner?
						</label>
					</div>

					<Link to={`/signup`} className='text-center mb-8'>
						Don't have an account?
					</Link>

					<BtnForRegister className='p-2 text-2xl text-stone-50 bg-primary rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-primaryVariant '>
						Submit
					</BtnForRegister>
				</form>
			</div>
			{/* <FooterForLogin className='text-sm font-medium'></FooterForLogin> */}
		</>
	);
}
