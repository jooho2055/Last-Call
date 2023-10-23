import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inputsForSignIn } from '../utils/formConfig';
import FormInput from '../components/FormInput';

export default function SignIn() {
	const [inputValues, setInputValues] = useState({
		username: '',
		pwd: '',
		loginas: 'customer',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputValues);
	};

	const onChange = (e) => {
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};

	const handleCheckbox = (e) => {
		if (e.target.checked) {
			setInputValues({ ...inputValues, loginas: 'restaurant' });
		} else {
			setInputValues({ ...inputValues, loginas: 'customer' });
		}
	};
	return (
		<div className='m-auto'>
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
				<button className='border text-4xl'>Submit</button>
			</form>

			{/* <div>This is Sign In page</div>
			<Link to={`/signup`}>
				<button>Don't have accout? </button>
			</Link> */}
		</div>
	);
}
