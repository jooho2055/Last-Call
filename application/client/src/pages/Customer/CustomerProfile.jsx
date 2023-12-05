import React, { useState, useEffect } from 'react';
import { inputsUserProfile } from '../../utils/cusProfile';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserInformation } from '../../apis/get';
import FormInput from '../../components/FormInput';
import BtnForCustomer from '../../components/BtnForCustomer';
import { editCustomerProfile } from '../../apis/post';

export default function CustomerProfile() {
	const user = useSelector((state) => state.user);

	const {
		isLoading,
		error,
		data: userInfo,
	} = useQuery({
		queryKey: ['userInfo'],
		queryFn: () => fetchUserInformation(user.username),
	});

	const EditProfileInfo = useMutation({
		mutationFn: editCustomerProfile,
	});

	const [inputValues, setInputValues] = useState({
		username: '',
		fname: '',
		lname: '',
		email: '',
		// pwd: '',
		// cpwd: '',
		phone: '',
		bio: '',
	});

	useEffect(() => {
		if (userInfo) {
			setInputValues({
				username: userInfo.username || '',
				fname: userInfo.firstname || '',
				lname: userInfo.lastname || '',
				email: userInfo.email || '',
				// pwd: userInfo.password || '',
				// cpwd: userInfo.cpwd || '',
				phone: userInfo.phone || '',
				bio: userInfo.bio || '',
			});
		}
	}, [userInfo]);

	const [validity, setValidity] = useState({
		username: true,
		fname: true,
		lname: true,
		email: true,
		// pwd: true,
		// cpwd: true,
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
		setFormModified(false);
		EditProfileInfo.mutate({
			username: inputValues.username,
			email: inputValues.email,
			bio: inputValues.bio,
			name: inputValues.fname,
			lastName: inputValues.lname,
			phoneNumber: inputValues.phone,
		});
		setEditMode(false);
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
		setFormModified(false);
	};

	const saveButtonClass = formModified
		? 'bg-orange-400 hover-bg-orange-400 text-white font-bold py-2 px-4 rounded-full'
		: 'bg-orange-200 text-white font-bold py-2 px-4 rounded-full';

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	return (
		<div className='flex justify-center items-center h-full'>
			{userInfo && (
				<div className='max-w-[80rem] '>
					<form
						onSubmit={handleSubmit}
						className='bg-slate-100 p-8 rounded-lg shadow-md mx-auto font-medium'
					>
						<h1 className='text-xl mb-4 text-center font-semibold '>User Profile</h1>

						{inputsUserProfile?.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={inputValues[input.name]}
								onChange={handleChange}
								isValid={validity[input.name]}
								disabled={!editMode}
								classNameForLabel='pl-1 mb-1'
								classNameForInput='w-80 rounded-lg p-2 mt-1 mb-1 ml-0 mr-0 shadow-md outline-none border-2 focus:border-[#7388a0]'
							/>
						))}

						<div className='mt-7 flex justify-center gap-x-2'>
							<BtnForCustomer
								className={saveButtonClass}
								disabled={isSubmitDisabled}
								type='submit'
							>
								Save
							</BtnForCustomer>
							<BtnForCustomer
								type='button'
								className='font-bold border-2 px-4 py-2 rounded-full bg-white text-black'
								onClick={toggleEditMode}
							>
								{editMode ? 'Cancel' : 'Edit'}
							</BtnForCustomer>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
