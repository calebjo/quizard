const express = require("express");
const app = express();
const path = require('path');

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const questionSets = require("./routes/api/question_sets");
const questions = require("./routes/api/questions");
const lobby = require('./routes/api/lobby');
const gameRecords = require("./routes/api/game_records");

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(___dirname, 'frontend', 'build', 'index.html'))
    })
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users/", users);
app.use("/api/question_sets/", questionSets);
app.use("/api/questions/", questions);
app.use("/api/lobby/", lobby);
app.use("/api/game_records/", gameRecords);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`))

// WebSocket setup and events ----------------------------
const wsServer = app.listen(443)
const socket = require('socket.io');

io = socket(wsServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on('connection', socket => {
    // REFERENCE FOR FUTURE
    // to the connecting client
    // socket.emit('message', 'Welcome to Quizard, new user!')

    // to all BUT the connecting client
    // socket.broadcast.emit('message', 'A new user has connected')

    // to ALL clients
    // io.emit('message', 'Hi!')

    // socket.on('disconnect', () => {
    //     io.emit('message', 'A user has disconnected.')
    // })

    // chat messages
    socket.on('chatMessage', (message, user, roomId) => {
        socket.broadcast.emit('message', message, user, roomId)
        // socket.to(roomId).broadcast.emit('message', message, user, roomId)
    })

    // joining a game room
    socket.on('joinRoom', (roomId, startGameState) => {
        socket.join(roomId)
        socket.to(roomId).emit('playerJoined', startGameState)
    })

    // updating a room's game state
    socket.on('gameStateUpdate', (roomId, newGameState) => {
        socket.to(roomId).emit('sendUpdatedState', newGameState)
    })
})