import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../redux/userActions2';
import ProfileInput from '../components/ProfileInput';
import { inputsUserProfile } from '../utils/cusProfile';
import { useQuery, QueryClient,QueryClientProvider  } from 'react-query';

const fetchUserProfile = async (username) => {
  const userProfileUrl = `http://13.52.182.209/customers/getUserProfile/${username}`;
  const response = await axios.get(userProfileUrl);
  return response.data;
};

export default function CustomerProfile() {
    const user = useSelector((state) => state.user);
    const username = user.username;
    const dispatch = useDispatch();

  const queryClient = new QueryClient();

  const { data: userProfile, error: fetchError, isLoading } = useQuery(
    ['userProfile', username], 
    () => fetchUserProfile(username)
    );

  const [inputValues, setInputValues] = useState({
    username: userProfile?.username || '',
    fname: userProfile?.fname || '',
    lname: userProfile?.lname || '',
    email: userProfile?.email || '',
    pwd: userProfile?.pwd || '',
    cpwd: userProfile?.cpwd || '',
    phone: userProfile?.phone || '',
    bio: userProfile?.bio || '',
  });

  useEffect(() => {
    if (userProfile) {
      setInputValues(userProfile);
    }
  }, [userProfile]);

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
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const editProfileUrl = 'http://13.52.182.209/customers/edit';
    
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
          .catch((error) => {
            console.error('Error updating user profile:', error);
            setErrorMsg('An error occurred while updating your profile. Please try again later.');
          });
      };
    

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <QueryClientProvider client={new queryClient()}> 
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-slate-100 p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-xl mb-4 text-center font-semibold text-slate-950">User Profile</h1>
        {isLoading ? (
          <div className="text-center">Loading user profile data...</div>
        ) : (
          <>
            {!isLoading && inputValues !== null && inputsUserProfile.map((input) => (
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
              <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full" disabled={isSubmitDisabled}>
                Save
              </button>
              <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={toggleEditMode}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </>
        )}
        {successMessage && <div className="text-green-600 text-center">{successMessage}</div>}
        {errorMsg && <div className="text-red-600 text-center">{errorMsg}</div>}
        {fetchError && <div className="text-red-600 text-center">{fetchError.message}</div>}
      </form>
    </div>
    </QueryClientProvider>
  );
}