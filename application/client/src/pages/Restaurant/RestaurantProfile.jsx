import React, { useState, useEffect } from 'react';
import { inputForRestaurant, optionsForState, optionsForCuisine } from '../../utils/resProfile';
import { useQuery } from '@tanstack/react-query';
import FormInput from '../../components/FormInput';
import Select from 'react-select';
import {fetchRestaurantsProfile} from '../../apis/get';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RestaurantProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);
  const [orignalPassword, setorignalPassword] = useState('');
 
  const id = user.userId;
  const profileData = useQuery({
    queryKey: ["profileData"],
    queryFn: () => fetchRestaurantsProfile(id),
  })
  const [file, setFile] = useState(null);

	const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setNewImageSelected(true);
        setFileChosen(true);
    };
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
      img_path:'',
    });  

    useEffect(() => {
      if(user.isLoggedIn){
        if(user.role !== 'restaurants'){
          navigate("/home")
          }
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
                  img_path:profileData?.data?.img_path || '',
              });
              setorignalPassword(profileData?.data?.password || '');
            }  
          }
          else{
            navigate('/signin');
          }    
        
        }, [profileData.status, profileData.data, navigate, user.isLoggedIn, user.role]);    


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

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const isSubmitDisabled =
    !Object.values(validity).every((isValid) => isValid) ||
    !Object.values(inputValues).every((value) => value) ||
    !editMode ||
    (!formModified && !fileChosen);

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
  };

  function checkpassword(pwd, cpwd) {
		if (pwd && inputValues.cpwd) {
			if (pwd !== cpwd) {
				return false;
			}
		}
		return true;
	}

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formModified) {
      const data = {
        id: id,
        username: inputValues.username,
        phone: inputValues.phone,
        email: inputValues.email,
        restName: inputValues.rname,
        street: inputValues.street,
        city: inputValues.city,
        zipcode: inputValues.zip,
        state: inputValues.state,
        cuisine: inputValues.cuisine}
  
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
       
      if(inputValues.pwd !== orignalPassword){
        console.log ("new password: "+inputValues.pwd);
        const Passwordresponse = await fetch("http://13.52.182.209/restaurants/profile/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurantId: id,
            password: inputValues.pwd,
          }),
        });
        const Passwordresult = await Passwordresponse.json();
        console.log("Success password", Passwordresult);
      }
  
        setFormModified(false);
        setSubmissionSuccess(true);
     
        setTimeout(() => {
          setSubmissionSuccess(false);
        }, 3000); 
      } catch (error) {
        console.error("Error:", error);
      }
    }

      if(newImageSelected && fileChosen){
        const formData = new FormData();
        formData.append('file', file);
			  formData.append('restaurantId', id);
            axios.post('http://13.52.182.209/restaurants/profile/image', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
				})
				.then(response => {
				console.log('File uploaded successfully', response);
				})
				.catch(error => {
				console.error('Error uploading file', error);
				});
        setNewImageSelected(false);
        setFileChosen(false);
        setSubmissionSuccess(true);
        setTimeout(() => {
          setSubmissionSuccess(false);
        }, 3000); 

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
    setNewImageSelected(!newImageSelected);
    setFormModified(false);   
    
  };

  const saveButtonClass = ((formModified || fileChosen) && editMode)
    ? 'bg-orange-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full'
    : 'bg-orange-200 text-white font-bold py-2 px-4 rounded-full';

  return (
    <div className="min-h-full m-auto flex justify-center bg-white">
      <div className="w-96 p-4 border rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl mb-4 font-semibold text-slate-950">Restaurant profile</h1>      
          {inputValues.img_path && (
           <img
            src={`http://13.52.182.209${inputValues.img_path}`}
             className='rounded-t-xl w-[400px] h-[300px] object-cover'
           alt='profile img'
            />
           )}
          {inputForRestaurant.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={inputValues[input.name]}
              onChange={onChange}
              classNameForInput={"shadow-md rounded-md h-10"}
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
          <br/>
          <label className={`bg-${newImageSelected ? 'orange-400' : 'orange-200'} text-white p-2 rounded-md mb-4`}>
						   <input type="file" onChange={onFileChange} className='hidden'/>
						   {fileChosen ? 'File Chosen' : 'Select Food Image'}
						</label> 
          <div className="mt-4 flex justify-center">
            <button className="text-black-500 underline font-bold" type='button' onClick={toggleEditMode}>
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button className={saveButtonClass} type='submit' disabled={isSubmitDisabled}>
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