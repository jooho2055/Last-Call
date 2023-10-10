import './Search.css';
import { useRef } from 'react';
import React from 'react';
import axios from 'axios';
const Search=()=>{
  const inputRef = useRef(null);
  async function submit(e){
    e.preventDefault()
    try{
      await axios.post("http://localhost:3000/sendData",{
        inputRef
      })
    }
    catch(e){
      console.log(e)
    }
  }
  function handleSubmit () {
    console.log(inputRef.current.value);
  }
  return(
    <div className='search-container'>
     
     <input type="text" className='searchbox' placeholder='Search...' ref={inputRef}/>
     <button type="submit" className='searchbutton' onClick={handleSubmit}>
     <img className='searchpicture' src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg' alt="searchingico"/>
    </button>
     </div>   

  )

}

export default Search;
