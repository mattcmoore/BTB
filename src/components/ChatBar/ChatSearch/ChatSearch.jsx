import { useState } from 'react'
import './ChatSearch.css'

import { API_URL } from '../Chatbar'

const ChatSearch = () => {
   const [ searchField, setSearchField ] = useState('')
   const [ suggestions, setSuggestions ] = useState([])

   const populateSuggestions = async (search) => {
      if(search){
         const response = await fetch(`${API_URL}/usersSearch/`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
             },
            body: JSON.stringify({search})
         })
         const data = await response.json()
         setSuggestions(data)
      } else setSuggestions([])
   }

   const handleChange = (e) => {
      populateSuggestions(e.target.value)
      setSearchField(e.target.value)
   }

   return (
      <div>
         <form>
            <input type='text' 
               value={searchField} 
               placeholder='Search'
               onChange={handleChange}></input>
         </form>
         <div className='all-suggestions'>
            {suggestions.map(user=>
               <div className='search-suggestion'>
                  {user.name}
               </div>
            )}
         </div>
      </div>
   )
}

export default ChatSearch