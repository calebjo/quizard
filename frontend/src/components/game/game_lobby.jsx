import React from "react";
import {socket} from "../../util/socket_util"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";
import Game from "./game"

// Establishes webSocket conneciton to every joining player
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lobby: null,
            creator: null,
            playing: false,
            players: null,
            questions: null,
            currentQuestion: null,
            currentRound: 0, 
            numPlayers: 0,
            gameState: null,
            game: null,
        }
        
        this.responses = [];
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        
          window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, are you sure?";
        };
     
        this.props.fetchLobby(this.props.match.params.id).then(({lobby}) => {
            this.props.fetchQuestionSet(lobby.data.set_id)
            this.props.fetchSetQuestions(lobby.data.set_id)

            let questions; 
            this.props.questions.length > 10 ? questions = this.props.questions.slice(5, 15) : questions = this.props.questions;

            this.setState({
                creator: lobby.data.creator_id,
                questions: questions,
                lobby: this.props.lobby.room_id
            })

            if (this.state.questions) {
                const currentQuestion = this.state.questions[this.state.currentRound]
                this.setState({ currentQuestion })
            }

            socket.emit('joinRoom', this.props.lobby.room_id, this.props.currentUser)

            // on a new client connection, give them the game state data
            socket.on('playerJoined', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
                socket.emit('secondRound', this.props.lobby.room_id)
            })

            socket.on('sendToRecentClient', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
            })

            socket.on('playerDisconnect', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
                socket.emit('secondRoundDisconnect', this.props.lobby.room_id)
            })

            socket.on('sendToOldClients', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
            })

            socket.on('clientGameStarted', (roomId, stateObj) => {
                this.setState(stateObj)
                socket.emit('gameStartedHandshake', roomId, stateObj)
            })

            socket.on('completeGameStartHandshake', (stateObj) => {
                this.setState(stateObj)
            })

            socket.on('serverQuestionResponse', (responseObj) => {
                this.responses.push(responseObj);

                if (this.responses.length === this.state.numPlayers) {
                    const game = this.state.game;
                    game.playRound(this.state.currentQuestion, this.state.players)
                    console.log(game.activePlayers)
                    console.log(game.inactivePlayers)
                }
            })

            // // update state whenever the lobby's state updates
            // socket.on('sendUpdatedState', () => {
            // })
        })
    }

    // componentWillUnmount() {
    //     socket.emit('disconnect')
    // }

    startGame() {
        const numPlayers = Object.keys(this.state.players).length
        const stateObj = {
            playing: true,
            game: new Game(this.state.questions, this.state.players),
            numPlayers
        }
        socket.emit('gameStarted', this.state.lobby, stateObj)
    }
    
    render() {
        // socket.emit('gameStateUpdate', this.props.lobbyId, this.state)

        if (!this.props.lobby) {
            return (
                <div className="lobby__error">
                    Sorry, your lobby was not found.
                </div>
            )
        }

        const questionSet = this.props.questionSets[this.props.lobby.set_id]

        const lobbyNav = this.props.currentUser 
        && this.props.currentUser.id === this.state.creator ? 
        (<div className="lobby__top-bar">
            <button className="lobby__invite">
                Invite Players{/* generates link to url */}
            </button>
            <div className="lobby__quiz-title">
                Lobby : <span>{questionSet ? (questionSet.title) : ("")}</span>
            </div>
            <button
                className="lobby__start"
                onClick={this.startGame}>
                Start Game
            </button>
        </div>) : 
        (<div className="lobby__top-bar">
            <div className="lobby__quiz-title">
                Lobby : <span>{questionSet ? (questionSet.title) : ("")}</span>
            </div>
        </div>)

        // Creates a list of the players currently in the lobby
        // { SOCKET OR DB id: ['human', 'username', DB id if they have one]}
        let lobbyPlayers;
         if (this.state.players) {
            const ids = Object.keys(this.state.players);
            lobbyPlayers = Object.values(this.state.players).map((playerDataArray, idx) => {
                return <li key={ids[idx]}>{playerDataArray[1]}</li>
            })
        } else {
            lobbyPlayers = (
                <div className="lobby__empty">
                    Waiting for more players to join...
                </div>
            )
        }

        
        
        const gameOrLobby = this.state.playing 
        ?  (<GameView
                lobby={this.state.lobby}
                socket={socket}
                players={this.state.players}
                game={this.state.game}
                numPlayers={this.state.numPlayers}
                sendData={this.getData}
                question={this.state.currentQuestion}/>) 
        : (<div className="lobby__container">
                <div className="lobby__quit">
                </div>
                <div className="lobby__body">
                    {lobbyNav}
                    <div className="lobby__players-large">
                        {lobbyPlayers}
                    </div>
                </div>
            </div>)

        return(
            <div>
                {gameOrLobby}
                <GameChatContainer
                    socket={socket} />
            </div>
        )
    }
}

export default GameLobby;