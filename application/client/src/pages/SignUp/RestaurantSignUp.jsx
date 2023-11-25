import React, { useState } from 'react';
import {
	inputsForRestaurantOne,
	inputsForRestaurantTwo,
	optionsForState,
	optionsForCuisine,
} from '../../utils/formConfig';
import FormInput from '../../components/FormInput';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import BtnForRegister from '../../components/BtnForRegister';

export default function RestaurantSignUp() {
	const navigate = useNavigate();
	const [inputValues, setInputValues] = useState({
		username: '',
		pwd: '',
		cpwd: '',
		email: '',
		phone: '',
		rname: '',
		street: '',
		city: '',
		zip: '',
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
		zip: true,
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
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
						value
					) && checkpassword(value, inputValues.cpwd);
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
			case 'zip':
				isValid = /^\d+$/.test(value);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(inputValues);
		try {
			const response = await fetch(`http://13.52.182.209/users/signup/restaurant`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Note the capitalization
				},
				body: JSON.stringify(inputValues),
			});

			// The response is now handled directly here without .then()
			console.log(response);
			if (response.ok) {
				navigate('/signin');
			} else {
				console.log('Failed to sign up');
			}
		} catch (err) {
			console.log('Error!!!!');
			console.log(err);
		}
	};
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// };

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
		<div className='max-w-[60rem] bg-stone-100 rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] font-medium m-auto'>
			<h1 className='text-xl text-center my-8'>
				Join Us as a <strong>Restaurant Owner</strong>
			</h1>
			<form onSubmit={handleSubmit} className='bg-stone-100 rounded-3xl flex flex-col px-12'>
				<div className='flex justify-between gap-12 md:px-4 md:flex-col md:gap-0'>
					<div>
						{inputsForRestaurantOne.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={inputValues[input.name]}
								onChange={onChange}
								isValid={validity[input.name]}
								classNameForLabel='pl-1 mb-1'
								classNameForInput='w-80 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md outline-none border-2 focus:border-[#7388a0]'
							/>
						))}
					</div>

					<div>
						{inputsForRestaurantTwo.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={inputValues[input.name]}
								onChange={onChange}
								isValid={validity[input.name]}
								classNameForLabel='pl-1 mb-1'
								classNameForInput='w-80 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md outline-none border-2 focus:border-[#7388a0]'
							/>
						))}

						<div className='flex flex-col mt-2'>
							<label className='block ml-1 mb-2'>State</label>
							<Select options={optionsForState} onChange={handleState} />
						</div>

						<div className='flex flex-col mt-4'>
							<label className='block ml-1 mb-2'>Cuisin</label>
							<Select options={optionsForCuisine} onChange={handleCuisine} />
						</div>
					</div>
				</div>

				<BtnForRegister
					className='p-2 mt-10 mb-7 text-2xl text-stone-50 bg-primary rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-primaryVariant'
					disabled={isSubmitDisabled}
				>
					Submit
				</BtnForRegister>
			</form>
		</div>
	);
}
