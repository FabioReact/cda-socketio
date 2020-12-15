// Import des modules
const express = require("express")
const http = require("http")
const socketio = require("socket.io")

// Initialisation des variables
const port = 3000

// Création de notre application
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
	console.log("Un nouveau client vient de se connecter")
})

server.listen(port, () => {
	console.log(`Serveur lancé sur: http://localhost:${port}`)
})