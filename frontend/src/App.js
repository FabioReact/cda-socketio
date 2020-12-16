import { useState, useEffect } from "react"
import { io } from 'socket.io-client'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = io("http://localhost:3000")
  
    socket.on("message", data => {
      console.log(data)
    })
  
    socket.on("chat message", msg => {
      setMessages(messages => [...messages, msg])
    })
  }, [])

  return (
    <div>
      Frontend Socket.io
      <ul>
        {messages.map((msgObj, index) => <li key={index}>{msgObj.date} - {msgObj.message}</li>)}
      </ul>
    </div>
  );
}

export default App;
