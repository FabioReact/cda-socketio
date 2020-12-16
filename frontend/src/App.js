import { useState } from "react"
import Login from "./pages/Login"
import Chat from "./pages/Chat"

const App = () => {
	const [username, setUsername] = useState("")
	const [submit, setSubmit] = useState(false)

	/*
		En français:
		Il faudra afficher le chat lorsqu'il aura choisis un username et qu'il aura cliqué sur "Join"
		
		En pseudo-code:
		SI username = true ET bouttonCliqué = true
		ALORS affiche Chat
	*/

	return (
		<>
			<h1>Mon application</h1>

			{}
			{username.length && submit ? (
				<Chat username={username} />
			) : (
				<Login
					username={username}
					setUsername={setUsername}
					setSubmit={() => setSubmit(true)}
				/>
			)}
		</>
	)
}

export default App
