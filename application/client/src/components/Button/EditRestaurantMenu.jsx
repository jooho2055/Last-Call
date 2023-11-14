import React, { useState, useEffect } from 'react';
import FormInput from '../FormInput';
import { inputForMenu } from '../../utils/resProfile';
import { AiTwotoneEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditMenu } from '../../apis/post';


export default function Edit({ initialData }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
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
  const createMenuMutation = useMutation({
    mutationFn: EditMenu,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
    },
    onError: error => {
      console.error('Mutation Error:', error);
    },
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

const handleMenu = async (e) => {
  e.preventDefault();
  try {
    createMenuMutation.mutate({
      menuId: initialData.id,
      price: parseFloat(editFormData.aprice),
      originalPrice: parseFloat(editFormData.oprice),
      name: editFormData.fname,
      desc: editFormData.description,
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
  };

  return (
    <div>
      {!isOpen &&(
       <div className='text-3xl mt-[3.75rem]'>
          <button onClick={formatShows}><AiTwotoneEdit/></button>
        </div> 
      )} 
{isOpen && (
  <button
    onClick={formatShows}
    className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default transparent-overlay`}
  ></button>
)}

{isOpen && (
  <div className='relative w-[250px] h-[350px] rounded-md border-2 border-orange-500 flex flex-col justify-center items-center'>
    <form onSubmit={handleMenu}>
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
        <button disabled={isMenuSubmitDisable} className={`bg-orange-600 text-white px-4 py-2 rounded ${isMenuSubmitDisable ? 'opacity-50 cursor-not-allowed' : ''}`}>Save</button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}
