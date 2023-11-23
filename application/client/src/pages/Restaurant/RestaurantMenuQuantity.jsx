import React, {useState, useEffect} from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import RestaurantMenuUnsold from '../../components/RestaurantMenuUnsold';
import {getMenuTable} from '../../apis/get';
import { useQuery } from '@tanstack/react-query';

export default function RestaurantMenuQuantity() {
    const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const id = 1;

	const FromShows = () => {
	  setIsFormOpen(!isFormOpen);
	};
	const MenuList = useQuery({
		queryKey: ["MenuLists"],
		queryFn: () => getMenuTable(id),
	  })
	
	const handleSubmit = (e) =>{
		e.preventDefault();
		console.log('Selected Items:',selectedItems);
	};

    return (
        <div className='min-h-full m-auto flex justify-center bg-white relative'>
            <div className='absolute top-0 left-50'>
             <p>Menu</p>
                <button
					className='text-3xl mt-[0.85rem] mr-5'
					onClick={FromShows} >
					<AiFillPlusSquare />
				</button>
                {isFormOpen && (
					<button
						onClick={FromShows}
						className='fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-10 cursor-default'
					></button>
				)}
                {isFormOpen && (
					<div className='absolute top-30 right-30 w-auto h-72 overflow-y-auto justify-center items-center p-4 pt-0 bg-white border-orange-500 border-2'>
					<form onSubmit={handleSubmit}>
					  {MenuList.data.map((menu) => (
						<RestaurantMenuUnsold key={menu.id} restarantmenuInfo={menu} />
					  ))}
					  <button type='submit' className='bg-orange-500 text-white px-4 py-2 rounded'>
						Save
					  </button>
					</form>
				  </div>
				)}
            </div>
            
        </div>
    );
}

