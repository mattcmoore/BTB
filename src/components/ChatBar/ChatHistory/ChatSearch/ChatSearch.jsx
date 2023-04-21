import { useState } from 'react'
import './ChatSearch.css'

import { API_URL } from '../../Chatbar'

const ChatSearch = ({ newSession }) => {
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
      <div className='search-container'>
         <form>
            <input
               className='search-box'
               type='text' 
               value={searchField} 
               placeholder='Search Users'
               onChange={handleChange}></input>
         </form>
         <div className='all-suggestions'>
            {suggestions.map((user, i)=>
               <div
                  key={i} 
                  className='search-suggestion'
                  onClick={()=>{
                     newSession(user.id, user.name)
                     setSuggestions([])
                     setSearchField('')
                  }}>
                  {user.name}
               </div>
            )}
         </div>
      </div>
   )
}

export default ChatSearch