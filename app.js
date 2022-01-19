const express = require("express");
const app = express();

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const http = require('http');
const webSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(80)
const wsServer = new webSocketServer({
    httpServer: server
})

const clients = {};

wsServer.on('request', function(request) {
    const userId = 1;
    console.log((new Date()) + ' Received connection from origin ' + request.origin + '.')

    const connection = request.accept(null, request.origin);
    clients[userId] = connection;

    connection.on('message', function(message) {
        console.log('true')
    })
})



const users = require("./routes/api/users");
const questionSets = require("./routes/api/question_sets");
const questions = require("./routes/api/questions");
const gameRecords = require("./routes/api/game_records")

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
app.use("/api/game_records/", gameRecords);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`))