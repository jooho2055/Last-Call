import React,{useState, useEffect} from 'react';
import {inputForMenu} from '../../utils/resProfile';
import RestaurantMenuSetting from '../../components/RestaurantMenuSetting';
import { AiFillPlusSquare } from 'react-icons/ai';
import FormInput from '../../components/FormInput';
import { useSelector } from 'react-redux';
import { getMenuTable } from '../../apis/get';
import { createNewMenu } from '../../apis/post';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RestaurantMenutable() {
	const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const queryClient = useQueryClient();
	const [fileChosen, setFileChosen] = useState(false);
   useEffect(() => {
      if(user.isLoggedIn){
        if(user.role !== 'restaurants'){
			navigate("/home")
        }
      }
      else{
        navigate('/signin');
      }
    }, [navigate, user.isLoggedIn, user.role]); 
    const id = user.userId;
	const unsold = false;
    const MenuList = useQuery({
      queryKey: ["MenuLists"],
      queryFn: () => getMenuTable(id),
	  refetchInterval:1000,
    })
    const createMenuMutation = useMutation({
      mutationFn: createNewMenu,
      onSuccess: data =>{
        queryClient.setQueryData(["posts", data.id], data)
        queryClient.invalidateQueries(["posts"],{exact: true})
        console.log(data);
		return data;
      }, 
    });
    
  const [menuInput, setMenuInput] = useState({
		fname: '',
		oprice:'',
		aprice:'',
		description: '',
	});
	const [menuvalidity, setmenuValidity] = useState({
		fname: true,
		oprice: true,
		aprice: true,
		description: true,
	});
	const [file, setFile] = useState(null);

	const onFileChange = (e) => {
        setFile(e.target.files[0]);
		setFileChosen(true);
    };

	const [isFormOpen, setIsFormOpen] = useState(false);

	const FromShows = () => {
	  setIsFormOpen(!isFormOpen);
	};
    
    const isMenuSubmitDisable =
		    !Object.values(menuvalidity).every((isValid) => isValid) ||
		    !Object.values(menuInput).every((value) => value);
			const validateMenuInput = (name, value) => {
				let isValid = true;
				switch (name) {
					case 'fname':
						isValid = /^[A-Za-z0-9\s\S]{1,16}$/.test(value);
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
						isValid=false;
					
				}
				setmenuValidity({...menuvalidity, [name]: isValid});
			}
    const onMenuChange = (e) =>{
        const { name, value } = e.target;
        setMenuInput({...menuInput, [e.target.name]: e.target.value});
        validateMenuInput(name, value);
    }

	const handleMenu = async (e) => {
		e.preventDefault();
		console.log(id);
		try {
		  const menuResponse = await createMenuMutation.mutateAsync({
			  restaurantId: id,
			  price: parseFloat(menuInput.aprice),
			  originalPrice: parseFloat(menuInput.oprice),
			  name: menuInput.fname,
			  desc: menuInput.description,
		  });
            console.log(menuResponse.menuId);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('menuId', menuResponse.menuId);
            axios.post('http://13.52.182.209/restaurants/menus/image', formData, {
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
			setFileChosen(false);	

		} catch (error) {
		  console.error('An error occurred:', error);
		}
	  };
	  
	return (
		<div className='h-auto m-auto flex justify-center bg-white relative'>
			<div className='absolute top-0 left-50'>
			<div className='fixed z-10 bg-white w-[400px]'>	
			<p className='italic font-bold'>Menu Manage</p>
			<div className='flex space-x-4'>	
				<button
				    data-testid="button"
					className='text-3xl mt-[0.85rem] mr-5'
					onClick={FromShows} >	
					<AiFillPlusSquare />
				</button>
				<button
				 className='text-sm mt-[0.85rem] rounded bg-slate-900 text-white'>
				<Link to={'/restaurant/menu/unsold'}>	
				Set Quantity
				</Link>
				</button>
			</div>
			</div>	
				{isFormOpen && (
					<button
						onClick={FromShows}
						className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-10 cursor-default'
					></button>
				)}
				{isFormOpen && (
					<div className='fixed right-50 top-36 w-[400px] h-[420px] bg-gradient-to-r from-orange-200 via-slate-50 to-orange-200 rounded flex flex-col justify-center items-center'>
						<form onSubmit={handleMenu}>
						<div className='h-10'>
						<label className="bg-orange-400 text-white p-2 rounded-md mb-4">
						   <input type="file" onChange={onFileChange} className="hidden"/>
						   {fileChosen ? 'File Chosen' : 'Select Food Image'}
						</label> 
						</div>	
							{inputForMenu.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={menuInput[input.name]}
									onChange={onMenuChange}
									classNameForInput={"shadow-md rounded-md h-10"}
									isValid={menuvalidity[input.name]}
								></FormInput>
							))}
							<br/>
							<button disabled={isMenuSubmitDisable} className={`bg-orange-600 text-white px-4 py-2 rounded ${isMenuSubmitDisable ? 'opacity-50 cursor-not-allowed' : ''}`}>Submit</button>
						</form>
					</div>
				)}
				<div className='grid grid-cols-1 gap-4 overflow-y-auto mt-20 mb-56'>
				{Array.isArray(MenuList.data) &&
                   MenuList.data.map((food) => (
                  <RestaurantMenuSetting key={food.id} restarantmenuInfo={food} unsold={unsold}/>	
    
                 ))
                }
				</div>

			</div>
		</div>
	);
}
