![logo](/frontend/src/assets/images/quizard-logo.png)

Looking to sharpen your trivia skills? Searching for a new virtual platform to connect with your friends? Studying for a test? If you answered "yes" to any of these questions, look no further than Quizard!

# Overview
Quizard is an interactive platform that allows users to play multiplayer quiz games with their friends. Users can create their own sets of questions or start a game with questions from premade quiz banks. As users play, win, and create their own custom question sets, they will earn badges and ultimately become Quizards themselves!

![splash](/frontend/src/assets/images/splash-page-screenshot.png)

Quizard features a sleek and navigable user interface along with a number of interactive features, including a live chat function during games. Although only logged-in users may create custom question sets, Quizard flexibly allows users to browse the question set library and play games regardless of logged-in status.

[Check out the live site here!](https://quizard-aa.herokuapp.com/)

# Technologies
Quizard is built with the MERN stack (MongoDB, Express, React, and Node) in conjunction with WebSockets, allowing for realtime updates to all clients connected to the server during gameplay. 

Backend:
- Express
- MongoDB
- WebSocket
- Trivia API (https://trivia.willfry.co.uk/)

Frontend:
- Node.js
- React

# Implementation details

### Game logic
Quizard games follow single elimination logic: in each round of the game, a quiz question is presented to the players, and any of the players that do not select the correct answer are eliminated from the game. Players are allowed to continue viewing the game as inactive players after elimination, but they are no longer in contention for winning.

```javascript
playRound(question) {
    // question should be a singular question object
    // responses should be an array of 'response objects'
    // e.g. [{ playerId: response }, { playerId: response }, { playerId: response }]
        const correctAnswer = question.correctAnswer;
        let removals = [];
        let playerResponses = [];

        let players = Object.values(this.players);
        players.forEach(player => {
            player.giveResponse(question)
        })

        playerResponses.forEach(responseObj => {
            const player = Object.keys(responseObj)[0];
            const response = Object.values(responseObj)[0];
            if (response !== correctAnswer) {
                removals.push(player);
            }
        })

        if (removals.length > 0) {
            removals.forEach(player => {
                this.inactivePlayers[player] = this.activePlayers[player];
                delete this.activePlayers[player];
            })
        }

        this.round++;
        return true;
    }
   ```

### Live chat
Rather than rendering and updating the live chat log via straight DOM manipulation, Quizard stores chats in the browser state for greater flexibility. New chats are emitted to the socket upon chat message submission.
```javascript
    addMessage(message, user) {
        const newMessages = this.state.messages
        newMessages.unshift({
            user: user,
            text: message
        })
        this.setState({
            messages: newMessages
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.message.length > 0) {
            this.props.socket.emit('chatMessage', this.state.message, this.state.user, this.state.roomId)
            this.state.messages.unshift({
                user: this.state.user,
                text: this.state.message
            })
            this.setState({
                message: ""
            })
        }
    }

```

# Future directions
In future patch updates, Quizard will include:
- QuizBot: if users would like to play against somebody but do not have friends, our friendly AI QuizBot is there
- QuizBot+: if users would like to chat with the AI while they play, QuizBot+ is there
