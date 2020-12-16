import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

function Chat(props) {
	const { username } = props
	const [messages, setMessages] = useState([])
	const [inputValue, setInputValue] = useState("")

	// OBJECTIF: Afficher un message en vert lors de la connexion d'un utilisateur au Chat, en rouge lors de se déconnexion

	const onSubmitForm = e => {
		e.preventDefault()
		// Envoyer mon message au backend
		socket.emit("chat message", {
			from: username,
			message: inputValue
		})
		setInputValue("")
	}

	useEffect(() => {
		socket.on("message", data => {
			console.log(data)
		})

		socket.on("chat message", msg => {
			setMessages(messages => [...messages, msg])
		})

		socket.on("newConnection", () => {
			// console.log("Nouvelle connection")
			setMessages(messages => [
				...messages,
				{
					message: "Un utilisateur a rejoint la conversation",
					date: Date().toString(),
					classNames: "bg-green-200",
				},
			])
    })
    
		socket.on("newDeconnection", () => {
			setMessages(messages => [
				...messages,
				{
					message: "Un utilisateur a quitté la conversation",
					date: Date().toString(),
					classNames: "bg-red-200",
				},
			])
		})
	}, [])

	return (
		<div className="bg-red-500">
			Frontend Socket.io
			<ul>
				{messages.map((msgObj, index) => (
					<li key={index} className={msgObj.classNames}>
						{msgObj.date} - From {msgObj.from}: {msgObj.message}
					</li>
				))}
			</ul>
			<form onSubmit={onSubmitForm}>
				<input
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
				<button>Submit</button>
			</form>
		</div>
	)
}

export default Chat
