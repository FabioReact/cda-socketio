// Import des modules
const express = require("express")
const http = require("http")
const socketio = require("socket.io")

// Initialisation des variables
const port = 3000

// Création de notre application
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
	cors: {
		origin: "http://localhost:4000",
	}
})

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
	console.log("Un nouveau client vient de se connecter")
	socket.send("Welcome from server")


	// Documentation sur les "rooms": https://socket.io/docs/v3/rooms/
	// Join me sert à rejoindre la room passée en paramètre
	socket.join("react")

	// Je peux emmettre des évènements vers une "room" en particulier avec la méthode .to("nom de la room")
	// io.to("react").emit("")

	// Emit me sert à émettre un évènement particulier
	io.to("react").emit("newConnection")

	// Ecoute de l'evenement "chat message" - msg contient la data que le client a envoyé lors de "socket.emit"
	socket.on("chat message", msgObj => {
		// io.emit Envoi un message à tout le monde
		// socket.broadcast.emit Envoi un message à tout le monde SAUF au socket à l'origine de l'évènement (tout le monde sauf "moi")

		// J'envoie l'évènement "chat message" à tout les clients connectés
		const date = new Date()
		const time = `${date.getHours()}.${date.getMinutes()}`
		io.emit("chat message", {
			message: msgObj.message,
			from: msgObj.from,
			date: time // équivalent à juste écrire "date" car la clé et la valeur sont identiques
		})
	})

	// Cette fonction s'éxécutera lors de la déconnexion de l'utilisateur
	socket.on("disconnect", () => {
		console.log("Un client vient de se déconnecter")
		io.emit("newDeconnection")
	})
})

server.listen(port, () => {
	console.log(`Serveur lancé sur: http://localhost:${port}`)
})