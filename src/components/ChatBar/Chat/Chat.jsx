import { useEffect, useState } from "react"
import './Chat.css'

import { API_URL } from "../Chatbar"

const Chat = ({ to, from, name, closeSession }) => {

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
         <div className="chat-name" onClick={()=>setActive(!active)}>{name}</div>
         <div className="close btb-btn" onClick={()=>closeSession(to)}>X</div>
         <div className="chat-container btb-content-box" style={{visibility: active ? 'visible' : 'hidden'}}>
            <button className="btb-btn" onClick={getChats}>REFRESH</button>
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