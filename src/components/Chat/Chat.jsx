import { useEffect, useState } from "react"
import './Chat.css'

const Chat = ({ to, from }) => {

   const [ messages, setMessages ] = useState([])
   const [ newMessage, setNewMessage ] = useState('')

   const API_URL = 'http://localhost:3000'

   const getChats = async () => {
      let response = await fetch(`${API_URL}/messages/${to}/${from}`)
      let data = await response.json()
      setMessages(data)
   }

   useEffect(() => {
      getChats()
   }, [])

   const handleSendMessage = async (e) => {
      e.preventDefault();
      let response = await fetch(`${API_URL}/messages`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            "Content-Type": "application/json"
          },
         body: JSON.stringify(
            {to, from, body: newMessage}
         )
      })
      setNewMessage('')
      getChats()
   }

   return (
      <>
         <button onClick={getChats}>REFRESH</button>
         <div className="chatbox">
            {messages.map( msg => 
               <div key={msg.id} className={'msg ' + (msg.from_user == from ? 'msgFrom' : 'msgTo')}>
                  {msg.body}
               </div>)
            }
         </div>
         <form onSubmit={handleSendMessage}>
            <input 
               type='text'
               value={newMessage} 
               onChange={(e)=>{setNewMessage(e.target.value)}}
               placeholder='Write a message...'
               ></input>
            <input className="submit" type='submit' value='Send'></input>
         </form>
      </>
   )
}

export default Chat