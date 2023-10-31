
import React, {useState, useEffect}from 'react';
import MenuInfo from '../components/MenuInfo';

export default function Test() {
	const [menus, setMenus] = useState([]);
	async function fetchData(){
		const res = await fetch(`/restaurants/menu/list/1`,{
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
				{menus.map((menu)=>(
					<MenuInfo key={menu.id} props={menu}/>
				))}
			</div>
		</div>
	);
}