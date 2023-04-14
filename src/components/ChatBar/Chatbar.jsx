import { useState, useContext, useEffect } from "react";
import Chat from "./Chat/Chat";
import ChatSearch from './ChatSearch/ChatSearch'
import './Chatbar.css'
import BtbContext from "../../context/BtbContext";
import ChatHistory from "./ChatHistory/ChatHistory";

export const API_URL = 'http://localhost:3000'

const Chatbar = () => {
   const [ sessions, setSessions ] = useState([])

   const { user } = useContext(BtbContext)

   const newSession = (userID, name) => {
      setSessions([...sessions, {to: userID, from: user.userId, name}])
   }

   const closeSession = (id) => {
      let sessionsDupe = [...sessions]
      for (let i = sessions.length -1; i >= 0; i--){
         if (sessions[i].to === id){
            sessionsDupe.splice(i, 1)
            setSessions(sessionsDupe)
         }
      }
   }

   return (
      <div className="chatbar">
         <ChatSearch newSession={newSession}/>
         <ChatHistory />
         {sessions.map(session => 
               <Chat to={session.to} 
               from={session.from} 
               name={session.name}
               closeSession={closeSession}/>
            )}
      </div>
   )
}

export default Chatbar