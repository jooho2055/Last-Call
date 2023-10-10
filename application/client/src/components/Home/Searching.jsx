import './Search.css';
import { useState } from 'react';
import React from 'react';

function Search() {
  const[inputValue, setValue] = useState("");
  const handleSubmit = (event) =>{
    event.preventDefault();
    alert(`The value you entered was: ${inputValue}`)

  }
  return(
    <div className='search-container'>
     <form onSubmit={handleSubmit}>
     <input type="text" className='searchbox' placeholder='Search...' value={inputValue} onChange={(e) => setValue(e.target.value)}/>
     <button type="submit" className='searchbutton'>
     <img className='searchpicture' src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg' alt="searchingico"/>
    </button>
    </form>
     </div>   

  )

}

export default Search;
