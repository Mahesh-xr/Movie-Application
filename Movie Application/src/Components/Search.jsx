import React from 'react'

const Search = ({searchItem,setSearchItem,searchMovie}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="search image" onClick={() => (setSearchItem(searchItem)) }/>
            <input type="text" placeholder='Search Throught Thousands of Movie' value={searchItem} onChange={(e)=>{setSearchItem(e.target.value)}} />
        </div>
    
    </div>
  )
}

export default Search
