import { useState } from "react";
import Chat from "./Chat/Chat";
import './Chatbar.css'

const Chatbar = () => {
   const [ sessions, setSessions ] = useState([
      {to: '1', from: '2'},
      {to: '3', from: '5'}
   ])

   return (
      <div className="chatbar">
         {sessions.map(session => 
            <Chat to={session.to} from={session.from}/>
            )}
      </div>
   )
}

export default Chatbar