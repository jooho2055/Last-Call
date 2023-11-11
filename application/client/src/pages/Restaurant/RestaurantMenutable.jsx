import React,{useState, useEffect} from 'react';
import {inputForMenu} from '../../utils/resProfile';
import RestaurantMenu from '../../components/RestaurantMenu';
import { AiFillPlusSquare } from 'react-icons/ai';
import FormInput from '../../components/FormInput';
import { useSelector } from 'react-redux';
import {getMenuTable} from '../../apis/get';
import { createNewMenu } from '../../apis/post';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function RestaurantMenutable() {
	//const navigate = useNavigate();
    //const user = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    /* useEffect(() => {
      if(user.isLoggedIn){
        if(user.role === 'restaurant'){
          navigate('/restaurantprofile')
        }else{
          navigate("/home")
        }
      }
      else{
        navigate('/signin');
      }
    }, [navigate, user.isLoggedIn, user.role]); */
    const id = 1;
    const MenuList = useQuery({
      queryKey: ["MenuLists"],
      queryFn: () => getMenuTable(id),
    })
    const createMenuMutation = useMutation({
      mutationFn: createNewMenu,
      onSuccess: data =>{
        queryClient.setQueryData(["posts", data.id], data)
        queryClient.invalidateQueries(["posts"],{exact: true})
      }, 
    });
    
  const [menuInput, setMenuInput] = useState({
		fname: '',
		oprice:'',
		aprice:'',
	});
	const [menuvalidity, setmenuValidity] = useState({
		fname: true,
		oprice: true,
		aprice: true,
	});
    const [isOpen, setIsOpen] = useState(false);
	const formatShows = () =>{
		setIsOpen(!isOpen);
	};
    
    const isMenuSubmitDisable =
		    !Object.values(menuvalidity).every((isValid) => isValid) ||
		    !Object.values(menuInput).every((value) => value);
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

    //When I post error, it show "missing input", seems like there is no value save or possibly the name issue
    //will figure out later
	const handleMenu = async (e) => {
		e.preventDefault();
		try {
		  createMenuMutation.mutate({
				restaurantId: 1,
				price: parseFloat(menuInput.aprice),
				originalPrice: parseFloat(menuInput.oprice),
				name: menuInput.fname,
			});
		} catch (error) {
		  console.error('An error occurred:', error);
		}
	  };
	  
	return (
		<div className='min-h-full m-auto flex justify-center bg-white relative'>
			<div className='absolute top-0 left-50'>
				<p>Menu Manage</p>
				<button
					className='text-3xl mt-[0.85rem] mr-5'
					onClick={formatShows} 
				>
					<AiFillPlusSquare />
				</button>
				{isOpen && (
					<button
						onClick={formatShows}
						className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default'
					></button>
				)}
				{isOpen && (
					<div className='absolute right-50 w-72 h-96 bg-gray-100'>
						<form onSubmit={handleMenu}>
							{inputForMenu.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={menuInput[input.name]}
									onChange={onMenuChange}
									isValid={menuvalidity[input.name]}
								></FormInput>
							))}
							<button disabled={isMenuSubmitDisable}>Submit</button>
						</form>
					</div>
				)}
				<div className='grid grid-cols-1 gap-4'>
					{MenuList.data?.map((food) => (
						<RestaurantMenu key={food.id} restarantmenuInfo={food}/>
					))}
				</div>
			</div>
		</div>
	);
}
