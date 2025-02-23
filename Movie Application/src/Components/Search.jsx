import React from 'react'

const Search = ({searchItem,setSearchItem}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="search image" />
            <input type="text" placeholder='Search Throught Thousands of Movie' value={searchItem} onChange={(e)=>{setSearchItem(e.target.value)}} />
        </div>
    
    </div>
  )
}

export default Search
