import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { inputsForCustomerOne, inputsForCustomerTwo } from '../../utils/formConfig';
import BtnForRegister from '../../components/BtnForRegister';
import FooterForLogin from '../../components/FooterForLogin';

export default function CustomerSignup() {
	const navigate = useNavigate();
	const [inputValues, setInputValues] = useState({
		username: '',
		fname: '',
		lname: '',
		email: '',
		pwd: '',
		cpwd: '',
		phone: '',
	});

	const [validity, setValidity] = useState({
		username: true,
		fname: true,
		lname: true,
		email: true,
		pwd: true,
		cpwd: true,
		phone: true,
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
			case 'fname':
			case 'lname':
				isValid = /^[A-Za-z]+$/.test(value);
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
				isValid = /^\d{10,15}$/.test(value);
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
		try {
			const response = await fetch(`http://13.52.182.209/users/signup/customer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputValues),
			});

			console.log(response); // Now 'response' is used here
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

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
		validateInput(name, value);
		console.log(inputValues);
	};

	return (
		<>
			<div className='max-w-[60rem] bg-stone-100 rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] font-medium m-auto'>
				<h1 className='text-xl text-center my-8'>
					Join Us as a <strong>Customer</strong>
				</h1>
				<form
					onSubmit={handleSubmit}
					className='bg-stone-100 rounded-3xl flex flex-col px-12'
				>
					<div className='flex justify-between gap-12 md:px-4 md:flex-col md:gap-0'>
						<div>
							{inputsForCustomerOne.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={inputValues[input.name]}
									onChange={onChange}
									isValid={validity[input.name]}
									classNameForLabel='pl-1 mb-1'
									classNameForInput='w-80 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md'
								/>
							))}
						</div>
						<div>
							{inputsForCustomerTwo.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={inputValues[input.name]}
									onChange={onChange}
									isValid={validity[input.name]}
									classNameForLabel='pl-1 mb-1'
									classNameForInput='w-80 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md'
								/>
							))}
						</div>
					</div>

					<BtnForRegister className='p-2 mt-10 mb-7 text-2xl text-stone-50 bg-primary rounded-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-primaryVariant '>
						Submit
					</BtnForRegister>
				</form>
			</div>
		</>
	);
}
