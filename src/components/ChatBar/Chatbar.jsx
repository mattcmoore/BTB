import { useState } from "react";
import Chat from "./Chat/Chat";
import ChatSearch from './ChatSearch/ChatSearch'
import './Chatbar.css'

export const API_URL = 'http://localhost:3000'

const Chatbar = () => {
   const [ sessions, setSessions ] = useState([
      {to: '1', from: '2'},
      {to: '5', from: '3'}
   ])

   

   return (
      <div className="chatbar">
         <ChatSearch/>
         {sessions.map(session => 
               <Chat to={session.to} 
               from={session.from} />
            )}
      </div>
   )
}

export default Chatbar