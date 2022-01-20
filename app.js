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

const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');

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
const wsServer = require('http').createServer(app)
const socket = require('socket.io');
const io = socket(wsServer, {
    cors: {
        origin: ["http://localhost:3000", "https://quizard-aa.herokuapp.com/"],
        transports: ["websocket", "polling"]
        // methods: ["GET", "POST"],
        // credentials: true
    }
});

let clients = {};
let numClients = 0;

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
    socket.on('joinRoom', (roomId, user) => {
        // return info structure: [{id: [info]}, {id: [info]}]
        numClients++
        socket.join(roomId)
        const id = socket.client.id;

        if (user) {
            user = { [id]: ['human', user.username, user.id] }
        } else {
            const randomName = uniqueNamesGenerator({ 
                dictionaries: [adjectives, colors, animals, names],
                length: 2
            })
            user = { [id]: ['human', `${randomName}`, id]}
        }
        if (Array.isArray(clients[roomId])) {
            clients[roomId].push(user)
        } else {
            clients[roomId] = [user]
        }

        const localClients = clients[roomId];
        socket.to(roomId).emit('playerJoined', localClients)
    })

    socket.on('secondRound', (roomId) => {
        const localClients = clients[roomId];
        socket.to(roomId).emit('sendToRecentClient', localClients) 
    })

    socket.on('disconnect', () => {
        const id = socket.client.id;
        let rooms = Object.keys(clients);
        let roomId;
        let newRoom;
        rooms.forEach(roomCode => {
            let room = clients[roomCode];
            let sliceIdx;
            if (room) {
                room.forEach((client, idx) => {
                    if (id in client) {
                        sliceIdx = idx;
                        roomId = roomCode;
                        const left = room.slice(0, sliceIdx);
                        const right = room.slice(sliceIdx + 1)
                        newRoom = [].concat(left).concat(right);
                    }
                })
            }
        })
        clients[roomId] = newRoom;
        localClients = clients[roomId]
        socket.emit('playerDisconnect', localClients)
    })

    socket.on('secondRoundDisconnect', (roomId) => {
        const localClients = clients[roomId];
        socket.to(roomId).emit('sendToOldClients', localClients) 
    })

    socket.on('gameStarted', (roomId, stateObj) => {
        let roomInfo = roomId; 
        let stateObject = stateObj;
        socket.to(roomId).emit('clientGameStarted', roomInfo, stateObject)
    })

    socket.on('gameStartedHandshake', (roomId, stateObj) => {
        socket.to(roomId).emit('completeGameStartHandshake', stateObj)
    })

    socket.on('questionResponse', (roomId, responseObj) => {
        socket.to(roomId).emit('serverQuestionResponse', responseObj)
    })



    // // updating a room's game state
    // socket.on('gameStateUpdate', (roomId, newGameState) => {
    //     socket.to(roomId).emit('sendUpdatedState', newGameState)
    // })
});

wsServer.listen(port)