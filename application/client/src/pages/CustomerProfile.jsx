import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../redux/userActions2';
import ProfileInput from '../components/ProfileInput';
import { inputsUserProfile } from '../utils/cusProfile';

const BASE_URL = 'http://13.52.182.209';

export default function CustomerProfile() {
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    pwd: '',
    cpwd: '',
    phone: '',
    bio: '',
  });

  const [validity, setValidity] = useState({
    username: true,
    fname: true,
    lname: true,
    email: true,
    pwd: true,
    cpwd: true,
    phone: true,
    bio: true,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [htmlResponse, setHtmlResponse] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/customers/getUserProfile/?username=qwaszx`);
    
        const contentType = response.headers['content-type'];
    
        if (contentType && contentType.includes('application/json')) {
          const userData = response.data;
          console.log('Fetched User Data:', userData);
        
          // Set the fetched user data in the state, including password-related fields
          setInputValues({
            username: userData.username || '',
            fname: userData.fname || '',
            lname: userData.lname || '',
            email: userData.email || '',
            pwd: userData.pwd || '', // Include password fields
            cpwd: userData.cpwd || '', // Include confirm password fields
            phone: userData.phone || '',
            bio: userData.bio || '',
          });
        } else if (contentType && contentType.includes('text/html')) {
          const htmlData = response.data;
          console.log('HTML Response:', htmlData);
          setHtmlResponse(htmlData); // Store the HTML response in state
        } else {
          console.error('Unsupported Content Type:', contentType);
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error.message);
        if (error.response && error.response.data) {
          const htmlData = error.response.data;
          console.log('HTML Response:', htmlData);
          setHtmlResponse(htmlData); // Store the HTML response in state
        }
      }
    };

    fetchUserData();
  }, []); 

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

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Request Payload:', inputValues); // Log the payload
    const editProfileUrl = `${BASE_URL}/customers/edit`;

    axios
      .post(editProfileUrl, inputValues)
      .then((response) => {
        const updatedUserData = response.data;
        dispatch({ type: SET_USER_DATA, payload: updatedUserData });
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      })
      .catch
      .catch((error) => {
        console.error('Error updating user profile:', error);
        setErrorMsg(
          'An error occurred while updating your profile. Please try again later.'
        );
      });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Only call handleSave when in edit mode
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto">
        <h1 className="text-2xl mb-4 text-center font-semibold text-gray-700">
          User Profile
        </h1>
        {editMode ? (
          <>
            {inputsUserProfile.map((input) => (
              <ProfileInput
                key={input.id}
                {...input}
                value={inputValues[input.name] || ''}
                onChange={handleChange}
                isValid={validity[input.name]}
                disabled={!editMode}
              />
            ))}
            <div className="mt-4 flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                disabled={isSubmitDisabled}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                onClick={toggleEditMode}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {inputsUserProfile.map((input) => (
              <div key={input.id} className="mb-4">
                <label
                  htmlFor={input.name}
                  className="block text-gray-700 font-bold mb-2"
                >
                  {input.label}
                </label>
                <div className="text-gray-900">
                  {inputValues[input.name]}
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={toggleEditMode}
              >
                Edit
              </button>
            </div>
          </>
        )}
        {successMessage && (
          <div className="text-green-600 text-center mt-4">
            {successMessage}
          </div>
        )}
        {errorMsg && (
          <div className="text-red-600 text-center mt-4">{errorMsg}</div>
        )}
        {htmlResponse && (
          <div className="text-red-600 text-center mt-4">{htmlResponse}</div>
        )}
      </form>
    </div>
  );
}
