import { useState } from 'react'
import './ChatSearch.css'

import { API_URL } from '../Chatbar'

const ChatSearch = () => {
   const [ searchField, setSearchField ] = useState('')
   const [ suggestions, setSuggestions ] = useState([])

   const populateSuggestions = async (search) => {
      const response = await fetch(`${API_URL}/usersSearch/`, {
         method: 'POST',
         body: JSON.stringify({search})
      })
      const data = await response.json()
      setSuggestions(data)
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
      </div>
   )
}

export default ChatSearch