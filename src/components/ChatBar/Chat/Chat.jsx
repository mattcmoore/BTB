import { useEffect, useState } from "react"
import './Chat.css'

import { API_URL } from "../Chatbar"

const Chat = ({ index, to, from, name, closeSession }) => {

   const [ messages, setMessages ] = useState([])
   const [ newMessage, setNewMessage ] = useState('')
   const [ active, setActive ] = useState(true)

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

   const dateTimeFormat = (date) => {
      const dateObj = new Date(date)
      let dateFormated = dateObj.toDateString()
      let hour = dateObj.getHours()
         if (hour < 10) hour = `0${hour}`
      let minute = dateObj.getMinutes()
         if (minute < 10) minute = `0${minute}`

      return `${hour}:${minute} | ${dateFormated}`
   }

   return (
      <div className="chat-bottom-nav btb-content-box">
         <div className="chat-name" onClick={()=>setActive(!active)}>
            {name}
            <div className="close btb-btn" onClick={()=>closeSession(index)}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
               <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
               </svg>
            </div>
         </div>
         <div className="chat-container btb-content-box" style={{visibility: active ? 'visible' : 'hidden'}}>
            <button className="btb-btn" onClick={getChats}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
               </svg>
            </button>
            <div className="chatbox">
               {messages.map( msg => 
                  <div key={msg.id} className={'msg ' + (msg.from_user == from ? 'msgFrom' : 'msgTo')}>
                     {msg.body}
                     <span className="msgTime">
                        {dateTimeFormat(msg.date)}
                     </span>
                  </div>)
               }
            </div>
            <form onSubmit={handleSendMessage}>
               <textarea className="chat-input btb-input"
                  type='text'
                  value={newMessage} 
                  onChange={(e)=>{setNewMessage(e.target.value)}}
                  placeholder='Write a message...' ></textarea>
               <input className="submit btb-btn" type='submit' value='Send'></input>
            </form>
         </div>
      </div>
   )
}

export default Chat