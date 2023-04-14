import { useContext, useEffect, useState } from "react"
import BtbContext from "../../../context/BtbContext"
import './ChatHistory.css'

const ChatHistory = ({ user, newSession }) => {
   const [ history, setHistory ] = useState([])

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
      <div className="ChatHistBanner">
         Conversations
         <div className="ChatHistory">
            {history.map(conversation => {
               return (
                  <div className="conversation"
                  key={conversation.to_user}
                     onClick={() => newSession(conversation.to_user, conversation.name)}>
                     {conversation.name}
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default ChatHistory