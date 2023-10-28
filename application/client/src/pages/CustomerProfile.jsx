import React, { useState } from 'react';
import ProfileInput from '../components/ProfileInput';
import { inputsUserProfile } from '../utils/cusProfile';


export default function CustomerProfile() {
    const [inputValues, setInputValues] = useState({
		idea: '',
		fname: '',
		lname: '',
		email: '',
		pwd: '',
		cpwd: '',
		phone: '',
        bio: '',
	});
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
    const isSubmitDisabled =
        !Object.values(validity).every((isValid) => isValid) ||
        !Object.values(inputValues).every((value) => value);

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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputValues);
    };

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

  return (
    <div className='container mx-auto px-4 py-8'>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-8 rounded-lg shadow-md max-w-md mx-auto'>
            <h1 className='text-xl mb-4 text-center font-semibold text-slate-950'>User Profile</h1>
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
                <div className="mt-4 flex justify-center">
                <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full" disabled={isSubmitDisabled}>
                    Save
                </button>
                <button type='button' className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={toggleEditMode}>
                    {editMode ? 'Cancel' : 'Edit'}
                </button>
                </div>
            </form>
    </div>
  );
}
