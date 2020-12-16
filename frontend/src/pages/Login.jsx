const Login = props => {
	const { username, setUsername, setSubmit, room, setRoom } = props
	const rooms = ["react", "node", "git", "c#"]


	const onSubmitForm = (event) => {
		event.preventDefault()
		if (username.length)
			setSubmit()
	}

	return (
		<form onSubmit={onSubmitForm}>
			<label htmlFor='username'>Username</label>
			<input
				type='text'
				id='username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<button>Join</button>
			<ul>
				{rooms.map((room, index) => <li onClick={() => setRoom(room)} key={index}>{room}</li>)}
			</ul>
		</form>
	)
}

export default Login
