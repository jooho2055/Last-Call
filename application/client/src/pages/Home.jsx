import React from 'react';
import { useState, useEffect } from 'react';


export default function Home() {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
 	useEffect(() => {
		fetch("/search", {
		method: 'GET'
		})
		.then((res) => {
			if (!res.ok) {
			throw new Error('Network response was not ok');
			}
			return res.json(); // Parse the response as JSON
		})
		.then((data) => {
			setSearchResult(data); // Set the name state with the data
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}, []);
	const inputChange = (event) => {
		setSearchValue(event.target.value)
	}
	const clicked = (event) => {
		event.preventDefault();
		fetch(`/search?search=${searchValue}`,{
			method: 'GET',
		}).then((res)=>{
			return res.json()
		}).then((data) => setSearchResult(data))
	}
	return (
		<div>
			<div>This is Team 7 Home section.</div>
			<div>
				<form onSubmit={clicked}>
					<input type="text" value={searchValue} onChange={inputChange} />
					<button type="sumbit">search</button>
				</form>
				<ul>
					<div>{searchResult.length}</div>
					{searchResult.map((member) => (
						<li>{member.name}</li>
					))}
				</ul>
			</div>
		</div>);
}
