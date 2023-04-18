import { useState, useContext, useEffect } from "react";
import Chat from "./Chat/Chat";
import ChatSearch from './ChatSearch/ChatSearch'
import './Chatbar.css'
import BtbContext from "../../context/BtbContext";
import ChatHistory from "./ChatHistory/ChatHistory";

export const API_URL = 'http://localhost:3000'

const Chatbar = () => {
   const { user, chatSessions, setChatSessions } = useContext(BtbContext)

   const newSession = (userID, name) => {
      setChatSessions([...chatSessions, {to: userID, name}])
   }

   const closeSession = (index) => {
      setChatSessions(prevSessions => prevSessions.filter((_, i) => i !== index))
   }

   return (
      <div className="chatbar">
         <div className="sidebar">
            <ChatSearch newSession={newSession}/>
            <ChatHistory user={user} newSession={newSession}/>
         </div>
         {chatSessions.map((session, i) => 
            <Chat 
            key={i}
            index={i}
            to={session.to} 
            from={user.userId} 
            name={session.name}
            closeSession={closeSession}/>
         )}
      </div>
   )
}

export default Chatbar