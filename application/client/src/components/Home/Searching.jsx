import './Search.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Card, CardContent, Input } from 'semantic-ui-react';

function Search() {
	const [searchResult, setSearchResult] = useState([]);
	const [searchValue, setSearchValue] = useState('');
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
		.catch((error) => {
			console.error('Error:', error);
		});
	}

  return(
    <div className='search-container'>
     <form onSubmit={clicked}>
     <input type="text" className='searchbox' placeholder='Search...' value={searchValue} onChange={inputChange}/>
     <button type="submit" className='searchbutton'>
     <img className='searchpicture' src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg' alt="searchingico"/>
    </button>
    </form>
        <ul>
					<div>{searchResult.length}</div>
                    <Card.Group itemsPerRow={3} className='Card_style'>
					{searchResult.map((restaurant) => {
						return(
						<><Card>
								<CardContent>
									<Card.Header>{restaurant.name_r}</Card.Header>
									<Card.Description>{restaurant.cuisine}</Card.Description>
									<Card.Description>{restaurant.status > 0 ? 'open' : 'close'}</Card.Description>
								</CardContent>
							</Card><br /></>
						)
						})}
					</Card.Group>
					
		</ul>

     </div>   

  )

}

export default Search;
