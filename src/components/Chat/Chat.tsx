import { useEffect, useState } from "react"

const Chat = ({ to, from }) => {

   const [ messages, setMessages ] = useState([])

   const getChats = async () => {
      let response = await fetch(`http://localhost:8001/messages/${to}/${from}`)
      let data = await response.json()
      console.log(data)
      setMessages(data)
   }

   useEffect(() => {getChats()}, [])

   return (
      <div>
         <button onClick={getChats}>asdfa</button>
         {messages.map( msg => <p>{msg.body}</p>)}
      </div>
   )
}

export default Chat