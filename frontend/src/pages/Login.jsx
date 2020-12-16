const Login = props => {
	const { username, setUsername, setSubmit } = props

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
		</form>
	)
}

export default Login
