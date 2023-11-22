import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputsForSignIn } from '../utils/formConfig';
import FormInput from '../components/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userActions';

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
		<div className='px-16 py-8 bg-gray-100 max-w-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-2xl font-medium'>
			<form
				onSubmit={handleSubmit}
				className='h-[30rem] w-[28rem] rounded-3xl flex flex-col '
			>
				<h1 className='text-3xl text-center mt-4 mb-10'>Sign In</h1>
				{inputsForSignIn.map((input) => (
					<FormInput
						key={input.id}
						value={inputValues[input.name]}
						onChange={onChange}
						{...input}
					/>
				))}

				<div className='mt-6 mb-8 text-center'>
					<input
						type='checkbox'
						id='roleSwitch'
						onChange={handleCheckbox}
						className='mr-5'
					/>
					<label htmlFor='roleSwitch'>Are you logging as a Restaurant Owner?</label>
				</div>
				<Link to={`/signup`} className='text-center mb-7'>
					Don't have accout?
				</Link>
				<button className='border p-2 text-3xl text-stone-50 bg-primary rounded-2xl'>
					Submit
				</button>
			</form>
		</div>
	);
}
