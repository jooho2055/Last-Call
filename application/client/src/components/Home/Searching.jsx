import './Search.css';
export default function Search (){
    return(
     <div className='search-container'>
     <form>
     <input type="text" className='Searchbox' placeholder='Search...' />
     <button type="submit" className='search-button'>
     <img className='fa-search' src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg' alt="searchingico"/>
    </button>
     </form> 
     </div>   
    );
}