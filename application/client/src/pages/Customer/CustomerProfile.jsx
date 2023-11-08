import React, { useState } from 'react';
import ProfileInput from '../../components/ProfileInput';
import { inputsUserProfile } from '../../utils/cusProfile';

export default function CustomerProfile() {
	const initialUserInfo = {
		idea: 'SampleUser',
		fname: 'John',
		lname: 'Doe',
		email: 'johndoe@example.com',
		pwd: 'Password123!',
		cpwd: 'Password123!',
		phone: '1234567890',
		bio: 'This is a sample biography.',
	};
	const storedUserProfile = JSON.parse(localStorage.getItem('userProfile')) || initialUserInfo;
	const [inputValues, setInputValues] = useState(storedUserProfile);
	const [validity, setValidity] = useState({
		idea: true,
		fname: true,
		lname: true,
		email: true,
		pwd: true,
		cpwd: true,
		phone: true,
		bio: true,
	});
	const [formModified, setFormModified] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const isSubmitDisabled =
		!Object.values(validity).every((isValid) => isValid) ||
		!Object.values(inputValues).every((value) => value) ||
		!formModified;

	const validateInput = (name, value) => {
		let isValid = true;

		switch (name) {
			case 'idea':
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
			case 'bio':
				isValid = /^[A-Za-z0-9\s]{0,100}$/.test(value);
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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInputValues({ ...inputValues, [name]: value });
		validateInput(name, value);
		setFormModified(true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		localStorage.setItem('userProfile', JSON.stringify(inputValues));
		console.log(inputValues);
		setFormModified(false);
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
		setFormModified(false);
	};

	const saveButtonClass = formModified
		? 'bg-orange-400 hover-bg-orange-400 text-white font-bold py-2 px-4 rounded-full'
		: 'bg-orange-200 text-white font-bold py-2 px-4 rounded-full';

	return (
		<div className='container mx-auto px-4 py-8'>
			<form
				onSubmit={handleSubmit}
				className='bg-slate-100 p-8 rounded-lg shadow-md max-w-md mx-auto'
			>
				<h1 className='text-xl mb-4 text-center font-semibold text-slate-950'>
					User Profile
				</h1>
				{inputsUserProfile.map((input) => (
					<ProfileInput
						key={input.id}
						{...input}
						value={inputValues[input.name]}
						onChange={handleChange}
						isValid={validity[input.name]}
						disabled={!editMode}
					/>
				))}
				<div className='mt-4 flex justify-center'>
					<button className={saveButtonClass} disabled={isSubmitDisabled}>
						Save
					</button>
				</div>
			</form>
			<div className='mt-4 flex justify-center'>
				<button className='text-black-500 underline  font-bold' onClick={toggleEditMode}>
					{editMode ? 'Cancel' : 'Edit'}
				</button>
			</div>
		</div>
	);
}
