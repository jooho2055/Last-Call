
import React, {useState, useEffect}from 'react';
import MenuInfo from '../components/MenuInfo';

export default function Test() {
	const [menus, setMenus] = useState({});
	async function fetchData(){
		const res = await fetch(`http://13.52.182.209/restaurants/menu/list/1`,{
			method: 'GET',
			headers: {
				"content-Type": 'application/json'
			}, 
		})
		const data = res.json()
		console.log(data)
		console.log(res)
	}
	useEffect( () => {
		fetchData();
	}, []);
	return (
		<div>
			<MenuInfo/>
		</div>
	);
}