import React, { useState } from 'react';
import { inputsForRestaurant, optionsForState, optionsForCuisine } from '../../utils/formConfig';
import FormInput from '../../components/FormInput';
import Select from 'react-select';

export default function RestaurantSignUp() {
	const [inputValues, setInputValues] = useState({
		username: '',
		pwd: '',
		cpwd: '',
		email: '',
		phone: '',
		rname: '',
		street: '',
		city: '',
		state: '',
		cuisine: '',
	});

	const [validity, setValidity] = useState({
		username: true,
		pwd: true,
		cpwd: true,
		email: true,
		phone: true,
		rname: true,
		street: true,
		city: true,
		state: true,
		cuisine: true,
	});

	const isSubmitDisabled =
		!Object.values(validity).every((isValid) => isValid) ||
		!Object.values(inputValues).every((value) => value);

	const validateInput = (name, value) => {
		let isValid = true;

		switch (name) {
			case 'username':
				isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
				break;
			case 'pwd':
				isValid =
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value) &&
					checkpassword(value, inputValues.cpwd);
				break;
			case 'cpwd':
				isValid = value === inputValues.pwd;
				break;
			case 'email':
				isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				break;
			case 'phone':
				isValid = /^\d{10,10}$/.test(value);
				break;
			case 'rname':
				isValid = /^[A-Za-z0-9\s]{2,50}$/.test(value);
				break;
			case 'street':
				isValid = /^[a-zA-Z0-9\s,'#-]+$/.test(value);
				break;
			case 'city':
				isValid = /^[A-Za-z\s]{2,50}$/.test(value);
				break;

			default:
				isValid = false;
		}

		setValidity({ ...validity, [name]: isValid });
	};

	function checkpassword(pwd, cpwd) {
		if (pwd && inputValues.cpwd) {
			if (pwd !== cpwd) {
				return false;
			}
		}
		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputValues);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
		validateInput(name, value);
	};

	const handleState = (option) => {
		setInputValues({ ...inputValues, state: option.value });
	};

	const handleCuisine = (option) => {
		setInputValues({ ...inputValues, cuisine: option.value });
	};

	return (
		<div className='flex justify-center items-center h-full'>
			<form onSubmit={handleSubmit} className='px-16  bg-slate-200'>
				<h1 className='text-3xl'>
					Join Us as a <strong>Restaurant Owner</strong>
				</h1>
				{inputsForRestaurant.map((input) => (
					<FormInput
						key={input.id}
						{...input}
						value={inputValues[input.name]}
						onChange={onChange}
						isValid={validity[input.name]}
					/>
				))}

				<label className='pl-1'>State</label>
				<Select options={optionsForState} onChange={handleState} />

				<label className='pl-1'>Cuisin</label>
				<Select options={optionsForCuisine} onChange={handleCuisine} />

				<button className='border text-4xl' disabled={isSubmitDisabled}>
					Submit
				</button>
			</form>
		</div>
	);
}
