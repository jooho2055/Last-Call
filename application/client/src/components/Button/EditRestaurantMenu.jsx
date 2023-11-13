import React, { useState, useEffect } from 'react';
import FormInput from '../FormInput';
import { inputForMenu } from '../../utils/resProfile';

export default function Edit({ initialData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fname: initialData.name,
    oprice: initialData.original_price,
    aprice: initialData.price,
    description: '',
  });
  const [menuvalidity, setmenuValidity] = useState({
    fname: true,
    oprice: true,
    aprice: true,
    description: true,
  });

  const isMenuSubmitDisable =
    !Object.values(menuvalidity).every((isValid) => isValid) ||
    !Object.values(editFormData).every((value) => value);

  const validateMenuInput = (name, value) => {
    let isValid = true;
    switch (name) {
      case 'fname':
        isValid = /^[A-Za-z0-9]{1,16}$/.test(value);
        break;
      case 'oprice':
        isValid = /^[0-9]*\.?[0-9]+$/.test(value) && parseFloat(value) > 0;
        break;
      case 'aprice':
        isValid = /^[0-9]*\.?[0-9]+$/.test(value) && parseFloat(value) > 0;
        break;
      case 'description':
        isValid = /[A-Za-z]/.test(value);
        break;
      default:
        isValid = false;
    }
    setmenuValidity({ ...menuvalidity, [name]: isValid });
  };

  const onMenuChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    validateMenuInput(name, value);
  };

  useEffect(() => {
    setIsOpen(false); 
  }, []);

  const formatShows = () =>{
    setIsOpen(!isOpen);
};

  return (
    <div>
      {!isOpen &&(
       <div className='text-xl mt-[3.75rem]'>
          <button onClick={formatShows}>Edit</button>
        </div> 
      )} 
{isOpen && (
  <button
    onClick={formatShows}
    className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default`}
  ></button>
)}

{isOpen && (
  <div className='w-[250px] h-[350px] bg-gray-100 rounded-md flex flex-col justify-center items-center'>
    <form>
      {inputForMenu.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={editFormData[input.name]}
          onChange={onMenuChange}
          isValid={menuvalidity[input.name]}
        ></FormInput>
      ))}
      <div className='flex justify-center'>
        <button disabled={isMenuSubmitDisable}>Save</button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}
