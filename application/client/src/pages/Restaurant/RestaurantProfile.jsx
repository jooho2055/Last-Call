import React, { useState, useEffect } from 'react';
import { inputForRestaurant, optionsForState, optionsForCuisine } from '../../utils/resProfile';
import { useQuery } from '@tanstack/react-query';
import FormInput from '../../components/FormInput';
import Select from 'react-select';
import {fetchRestaurantsProfile} from '../../apis/get';
import { useSelector } from 'react-redux';

export default function RestaurantProfile() {
  const user = useSelector((state) => state.user);
  const id = user.userId;
  const profileData = useQuery({
    queryKey: ["profileData"],
    queryFn: () => fetchRestaurantsProfile(id),
  })
  console.log(profileData.data);

  useEffect(() => {
	if (profileData.status === 'success' && profileData.data) {
	  setInputValues({
		    username: profileData.data.username || '',
		    pwd:profileData?.data?.password || '',
        cpwd:profileData?.data?.password || '',
        email:profileData?.data?.email || '',
        phone:profileData?.data?.phone || '',
        rname:profileData?.data?.name || '',
        street:profileData?.data?.address ||'',
        city:profileData?.data?.city ||'',
        zip:profileData?.data?.zipcode ||'',
        state:profileData?.data?.state ||'',
        cuisine:profileData?.data?.cuisine ||'',
		
	  });
	}
  }, [profileData.status, profileData.data]);

  const [inputValues, setInputValues] = useState({
    username: '',
    pwd: '',
    cpwd:'',
    email:'',
    phone:'',
    rname:'',
    street:'',
    city:'',
    zip:'',
    state:'',
    cuisine:'',
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

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const isSubmitDisabled =
    !Object.values(validity).every((isValid) => isValid) ||
    !Object.values(inputValues).every((value) => value) ||
    !passwordMatch ||
    !formModified;

  const validateInput = (name, value) => {
    let isValid = true;

    switch (name) {
      case 'username':
        isValid = /^[A-Za-z0-9]{5,16}$/.test(value);
        break;
      case 'pwd':
        isValid =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
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

    // Check password match
    if (name === 'pwd' || name === 'cpwd') {
      setPasswordMatch(checkPassword(inputValues.pwd, inputValues.cpwd));
    }
  };

  function checkPassword(pwd, cpwd) {
    if (pwd && cpwd) {
      return pwd === cpwd;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formModified) {
      const data = {
        id: id,
        username: inputValues.username,
        password:"E123456!",
        phone: inputValues.phone,
        email: inputValues.email,
        restName: inputValues.rname,
        street: inputValues.street,
        city: inputValues.city,
        zipcode: inputValues.zip,
        state: inputValues.state,
        cuisine: inputValues.cuisine}
        console.log(data);
  
      try {
        const response = await fetch("http://13.52.182.209/restaurants/profile/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log("Success:", result);
  
        setFormModified(false);
        setSubmissionSuccess(true);
  
        setTimeout(() => {
          setSubmissionSuccess(false);
        }, 3000); // Adjust the time as needed
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    validateInput(name, value);
    setFormModified(true);
  };

  const handleState = (option) => {
    setInputValues({ ...inputValues, state: option.value });
    setFormModified(true);
  };

  const handleCuisine = (option) => {
    setInputValues({ ...inputValues, cuisine: option.value });
    setFormModified(true);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setFormModified(false);
    setSubmissionSuccess(false);
  };

  const saveButtonClass = formModified
    ? 'bg-orange-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full'
    : 'bg-orange-200 text-white font-bold py-2 px-4 rounded-full';

  return (
    <div className="min-h-full m-auto flex justify-center bg-white">
      <div className="w-96 p-4 border rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl mb-4 font-semibold text-slate-950">Restaurant profile</h1>
          {inputForRestaurant.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={inputValues[input.name]}
              onChange={onChange}
              isValid={validity[input.name]}
              disabled={!editMode}
            />
          ))}
          <label className="pl-1">State</label>
          <Select
            options={optionsForState}
            onChange={handleState}
            value={optionsForState.find((option) => option.value === inputValues.state)}
            isDisabled={!editMode}
          />

          <label className="pl-1">Cuisine</label>
          <Select
            options={optionsForCuisine}
            onChange={handleCuisine}
            value={optionsForCuisine.find((option) => option.value === inputValues.cuisine)}
            isDisabled={!editMode}
          />
          <div className="mt-4 flex justify-center">
            <button className="text-black-500 underline font-bold" onClick={toggleEditMode}>
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button className={saveButtonClass} disabled={isSubmitDisabled}>
              Save
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="text-center">
              {submissionSuccess && (
                <p className="text-green-500">Profile updated successfully!</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}