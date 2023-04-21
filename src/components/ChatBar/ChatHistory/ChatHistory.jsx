import { useContext, useEffect, useState } from "react"
import BtbContext from "../../../context/BtbContext"
import './ChatHistory.css'
import ChatSearch from "./ChatSearch/ChatSearch"

const ChatHistory = ({ user, newSession }) => {
   const [ history, setHistory ] = useState([])
   const [ active, setActive ] = useState(false)

   const { fetchURL } = useContext(BtbContext)

   useEffect(() => {
      if (!user) return
      const fetchHist = async () => {
         const response = await fetch(`${fetchURL}/chatHistory/${user.userId}`)   
         const chat_history = await response.json()
         setHistory(chat_history)
      }
      fetchHist()
   }, [user])

   return (
      <div className="ChatHistContainer">
         <div className={`ChatHistory ${active ? 'show' : 'hide'}`}>
            {history.map(conversation => {
               return (
                  <div className="conversation"
                  key={conversation.to_user}
                     onClick={() => newSession(conversation.to_user, conversation.name)}>
                     {conversation.name}
                  </div>
               )
            })}
         <ChatSearch newSession={newSession}/>
         </div>
         <div className="ChatHistBanner btb-content-box"
            onClick={()=> setActive(!active)}>
            <p>Conversations</p>
         </div>
      </div>
   )
}

export default ChatHistory