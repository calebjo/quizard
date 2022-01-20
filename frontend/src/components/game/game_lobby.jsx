import React from "react";
import {socket} from "../../util/socket_util"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";

// Establishes webSocket conneciton to every joining player
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            creator: null,
            playing: false,
            players: null,
        }
        
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        window.onbeforeunload = function() {
            socket.emit('disconnect')
            return "Data will be lost if you leave the page, are you sure?";
        };
        this.props.fetchLobby(this.props.match.params.id).then(({lobby}) => {
            this.props.fetchQuestionSet(lobby.data.set_id)
            this.props.fetchSetQuestions(lobby.data.set_id)

            this.setState({
                creator: lobby.data.creator_id
            })

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

            // update state whenever the lobby's state updates
            socket.on('sendUpdatedState', () => {
            })
        })
    }

    componentWillUnmount() {
        socket.emit('disconnect')
    }

    startGame() {

        // this.setState({
        //     playing: true
        // })
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
            lobbyPlayers = '';
        }
        
        const gameOrLobby = this.state.playing ? (
            <GameView
                socket={socket}
                players={this.state.players}
                questions={this.props.questions}
            />
        ) : (
            <div className="lobby__container">
                <div className="lobby__quit">
                </div>
                <div className="lobby__body">
                    {lobbyNav}
                    <div className="lobby__players-large">
                        {lobbyPlayers}
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