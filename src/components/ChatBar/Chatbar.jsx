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

   const closeSession = (id) => {
      let sessionsDupe = [...chatSessions]
      for (let i = chatSessions.length -1; i >= 0; i--){
         if (chatSessions[i].to === id){
            sessionsDupe.splice(i, 1)
            setChatSessions(sessionsDupe)
         }
      }
   }

   return (
      <div className="chatbar">
         <div className="sidebar">
            <ChatSearch newSession={newSession}/>
            <ChatHistory user={user} newSession={newSession}/>
         </div>
         {chatSessions.map(session => 
            <Chat 
            key={session.to}
            to={session.to} 
            from={user.userId} 
            name={session.name}
            closeSession={closeSession}/>
         )}
      </div>
   )
}

export default Chatbar