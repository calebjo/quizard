import React from "react";
import {socket} from "../app"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";

// Establishes webSocket conneciton to every joining player
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        
        // this.state = {
        //     creator: this.props.location.state.creator,
        //     questionSet: this.props.location.state.questionSet,
        //     questions: this.props.location.state.questions,
        //     playing: false,
        //     players: players
        // }
        this.state = {
            creator: this.props.currentUser,
            playing: false
        }
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        window.onbeforeunload = function() {
            return "Data will be lost if you leave the page, are you sure?";
        };
        this.props.fetchLobby(this.props.match.params.id).then(({lobby}) => {
            this.props.fetchQuestionSet(lobby.data.set_id)
            this.props.fetchSetQuestions(lobby.data.set_id)

            // on a new client connection, give them the game state data
            socket.emit('joinRoom', this.props.lobby.room_id, this.state)

            socket.on('playerJoined', (startGameState) => {
                console.log("Player has joined the lobby!")
                this.setState(startGameState)
            })

            // update state whenever the lobby's state updates
            socket.on('sendUpdatedState', (newGameState) => {
                this.setState(newGameState)
            })
        })
    }

    startGame() {
        debugger
        this.setState({
            playing: true
        })
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
        
        const gameOrLobby = this.state.playing ? (
            <GameView
                socket={socket}
                players={this.state.players}
                questions={this.state.questions}
            />
        ) : (
            <div className="lobby__container">
                <div className="lobby__quit">
                </div>
                <div className="lobby__body">
                    <div className="lobby__top-bar">
                        <button className="lobby__invite">
                            Invite Players{/* generates link to url */}
                        </button>
                        <div className="lobby__quiz-title">
                            Lobby : <span>{questionSet ? (questionSet.title):("ERROR NO TITLE")}</span>
                        </div>
                        <button 
                            className="lobby__start"
                            onClick={this.startGame}>
                            Start Game
                        </button>
                    </div>
                    <div className="lobby__players-large">
                    </div>
                </div>
            </div>
        )

        return(
            <div>
                <GameChatContainer 
                    socket={socket}/>
                {gameOrLobby}
            </div>
        )
    }
}

export default GameLobby;