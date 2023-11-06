import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputsForSignIn } from '../utils/formConfig';
import FormInput from '../components/FormInput';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userActions';
import { useSelector } from 'react-redux';

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
		<div className='max-w-xl m-auto max-h-full'>
			<form onSubmit={handleSubmit} className='px-16 bg-slate-200'>
				<h1 className='text-3xl'>Sign In</h1>
				{inputsForSignIn.map((input) => (
					<FormInput
						key={input.id}
						value={inputValues[input.name]}
						onChange={onChange}
						{...input}
					/>
				))}

				<div>
					<input type='checkbox' id='roleSwitch' onChange={handleCheckbox} />
					<label htmlFor='roleSwitch'>Are you logging as a Restaurant Owner?</label>
				</div>
				<Link to={`/signup`}>
					<button className='block'>Don't have accout? </button>
				</Link>
				<button className='border text-4xl'>Submit</button>
			</form>
		</div>
	);
}
