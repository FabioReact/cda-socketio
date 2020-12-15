import { useState, useEffect } from "react"
import { io } from 'socket.io-client'

function App() {
  const [messages, setMessages] = useState([])
  const socket = io("http://localhost:3000")

  socket.once("message", data => {
    console.log(data)
  })

  socket.once("chat message", msg => {
    setMessages(messages => [...messages, msg])
  })

  // useEffect(() => {
    
  // }, [])

  return (
    <div>
      Frontend Socket.io
      <ul>
        {messages.map((message, index) => <li key={index}>{message}</li>)}
      </ul>
    </div>
  );
}

export default App;
