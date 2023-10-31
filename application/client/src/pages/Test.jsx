
import React, {useState, useEffect}from 'react';
import MenuInfo from '../components/MenuInfo';
import { useParams } from 'react-router-dom';

export default function Test() {
	const {id} = useParams();
	console.log(typeof(id))
	const [menus, setMenus] = useState([]);
	async function fetchData(){
		const res = await fetch(`/restaurants/menu/list/${id}`,{
			method: 'GET',
			headers: {
				"content-Type": 'application/json'
			}, 

		})
		const data = await res.json()
		setMenus(data)
	}
	useEffect( () => {
		fetchData();
	}, []);
	return (
		<div>
			<div>
				{/* <MenuInfo/> */}
				{
				(menus.length>1)?
					(menus.map((menu)=>(
						<MenuInfo key={menu.id} props={menu}/>
					))):(`${"We are preparing our menu!"}`)
				}
			</div>
		</div>
	);
}