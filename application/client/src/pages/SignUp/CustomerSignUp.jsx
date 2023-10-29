import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import {useNavigate} from 'react-router-dom';
import { inputsForCustomer } from '../../utils/formConfig';



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
		try{
			const res = await fetch(`/users/signup/customer`,{
			method: 'POST',
			headers: {
				"content-Type": 'application/json'
			},
			body: JSON.stringify(inputValues)
			})
			.then((res)=>{
				console.log(res)
				if(res.ok){
					navigate('/signin')
				}else{
					console.log("fail to sign up")
				}
			})
		}catch(err){
			console.log('err!!!!')
			console.log(err)
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
		validateInput(name, value);
	};

	return (
		<div className='max-w-xl m-auto'>
			<form onSubmit={handleSubmit} className='px-16  bg-slate-200'>
				<h1 className='text-3xl'>
					Join Us as a <strong>Customer</strong>
				</h1>
				{inputsForCustomer.map((input) => (
					<FormInput
						key={input.id}
						{...input}
						value={inputValues[input.name]}
						onChange={onChange}
						isValid={validity[input.name]}
					/>
				))}
				<button className='border text-4xl' disabled={isSubmitDisabled}>
					Submit
				</button>
			</form>
		</div>
	);
}
