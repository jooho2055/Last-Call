import React, { useState, useEffect } from 'react';
import FormInput from '../FormInput';
import { inputForMenu } from '../../utils/resProfile';
import { AiTwotoneEdit } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { editMenuItem } from '../../apis/post';
import { useMutation } from '@tanstack/react-query';



export default function Edit({ initialData }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [editFormData, setEditFormData] = useState({
    fname: initialData.name,
    oprice: initialData.original_price,
    aprice: initialData.price,
    description: initialData.description || "",
  });
  const [menuvalidity, setmenuValidity] = useState({
    fname: true,
    oprice: true,
    aprice: true,
    description: true,
  });
  const editeachMenuItem = useMutation({
    mutationFn: editMenuItem,
    onSuccess:data =>{
		  queryClient.setQueryData(["posts", data.id], data)
		  queryClient.invalidateQueries(["posts"],{exact: true})
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
const mydata = {menuId: initialData.id, name: editFormData.fname, price: editFormData.aprice, originalPrice: editFormData.oprice, quantity: initialData.quantity, desc:editFormData.description}
const handleMenu = async (e) => {
  e.preventDefault();
  console.log(mydata);
  editeachMenuItem.mutate({
    menuId: initialData.id,
    name: editFormData.fname,
    price: editFormData.aprice,
    originalPrice: editFormData.oprice,
    quantity: initialData.quantity,
    desc:editFormData.description,
  })
}

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
  <div className='relative z-0 w-[250px] h-[350px] bg-gradient-to-r from-orange-200 via-slate-50 to-orange-200 rounded flex flex-col justify-center items-center'>
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
