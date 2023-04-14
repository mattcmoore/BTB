import { useContext, useEffect, useState } from "react"
import BtbContext from "../../../context/BtbContext"

const ChatHistory = () => {
   const [ history, setHistory ] = useState([])

   const { fetchURL, user } = useContext(BtbContext)

   useEffect(() => {
      const fetchHist = async () => {
         const response = await fetch(`${fetchURL}/chatHistory/${user.userId}`)   
         const { chat_history } = await response.json()
         setHistory(chat_history.chatHist)
      }
      fetchHist()
   }, [])

   return (
      <>
      
      </>
   )
}

export default ChatHistory