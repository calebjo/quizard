import React from "react";
import {socket} from "../../util/socket_util"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faHome } from '@fortawesome/free-solid-svg-icons';

// Establishes webSocket conneciton to every joining player

// questions should be an array of question objects
// players should ONE object { computerId: ['computer', 'username'], socketId: ['human', 'username', db_id (if they have one], socketId: ['human', 'username'] }
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            socketId: null,
            totalRounds: null,
            lobby: null,
            creator: null,
            playing: false,
            players: null,
            questions: null,
        }

        this.startGame = this.startGame.bind(this);
        this.normalizeQuestions = this.normalizeQuestions.bind(this);
        this.handleCreatorExit = this.handleCreatorExit.bind(this);
    }

    componentDidMount() {
        
        window.onbeforeunload = function () {
            socket.disconnect();
            return "Data will be lost if you leave the page, are you sure?";
        };

        this.props.fetchLobby(this.props.match.params.id).then(({lobby}) => {
            this.props.fetchQuestionSet(lobby.data.set_id)
            this.props.fetchSetQuestions(lobby.data.set_id).then(questions => {
                let normalizedQuestions = this.normalizeQuestions(Object.values(questions.questions.data));
                this.setState({ 
                    questions: normalizedQuestions,
                    creator: lobby.data.creator_id,
                    lobby: this.props.lobby.room_id, 
                })
            })

            socket.emit('joinRoom', this.props.lobby.room_id, this.props.currentUser)

            // on a new client connection, give them the game state data
            socket.on('playerJoined', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
            })

            socket.on('userInfo', (id) =>{
                const socketId = id;
                this.setState({ socketId });
            })

            socket.on('sendToRecentClient', (localClients, id) => {
                let players = Object.assign(...localClients);
                this.setState({ players });
            })

            socket.on('playerDisconnect', (localClients) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
            })

            socket.on('clientGameStarted', (stateObj) => {
                this.setState(stateObj)
            })

            socket.on('game-over', () => {
                socket.disconnect();
                this.props.history.push("/");
            })
        })
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    startGame() {
        const numPlayers = Object.keys(this.state.players).length
        const activePlayers = this.state.players;
        const stateObj = {
            playing: true,
            numPlayers,
            activePlayers
        }
        socket.emit('gameStarted', this.state.lobby, stateObj)
    }
    
    normalizeQuestions(questions) {
        // Each question object should contain { question, incorrectAnswers, correctAnswer, category, type } 
        let normalizedQuestions = [];
        questions.forEach(question => {
            let _normalizedQuestion = {};
            _normalizedQuestion['correctAnswer'] = question.correctAnswer;
            _normalizedQuestion['question'] = question.question;
            _normalizedQuestion['category'] = question.category;
            _normalizedQuestion['type'] = question.type;
            if (question.incorrectAnswers.length < 4) {
                _normalizedQuestion['incorrectAnswers'] = question.incorrectAnswers;
            } else {
                _normalizedQuestion['incorrectAnswers'] = this.incorrectAnswersHelper(question.incorrectAnswers)
            }
            normalizedQuestions.push(_normalizedQuestion);
        })
        return normalizedQuestions
    }

    incorrectAnswersHelper(answersArray) {
        // In the event a question has more than 3 incorrect answers this function randomly selects 3
        let newAnswersArray = [];
        let indexStore = [];
        const totalOptions = answersArray.length;

        for (let i = 0; i < 3; i++) {
            let index = Math.floor(Math.random() * totalOptions);
            while (indexStore.includes(index)) {
                index = Math.floor(Math.random() * totalOptions);
            }
            indexStore.push(index);
            newAnswersArray.push(answersArray[index]);
        }

        return newAnswersArray;
    }

    handleCreatorExit () {
        this.props.deleteLobby(this.state.lobby);
        socket.emit('cancel-game', this.state.lobby);
    }

    // playRound(question, playerResponses) {
    //     // question should be a singular question object
    //     // responses should be an array of 'response objects'
    //     // e.g. [{ playerId: response }, { playerId: response }, { playerId: response }]

    //     const correctAnswer = question.correctAnswer;
    //     let removals = [];

    //     playerResponses.forEach(responseObj => {
    //         const player = Object.keys(responseObj)[0];
    //         const response = Object.values(responseObj)[0];
    //         if (response !== correctAnswer) {
    //             removals.push(player);
    //         }
    //     })

    //     const inactivePlayers = this.state.inactivePlayers;
    //     const activePlayers = this.state.activePlayers

    //     if (removals.length > 0) {
    //         removals.forEach(player => {
    //             inactivePlayers[player] = activePlayers[player];
    //             delete activePlayers[player];
    //         })
    //     }

    //     this.setState({ activePlayers, inactivePlayers })

    //     return true;
    // }

    render() {
        // socket.emit('gameStateUpdate', this.props.lobbyId, this.state)

        if (!this.props.lobby) {
            return (
                <div className="lobby__error">
                    Sorry, your lobby was not found.
                    <div>
                        <button className="styled-button red-bg" onClick={() => this.props.history.push("/join-game")}>
                            Try another lobby code
                        </button>
                        <button className="styled-button orange-bg" onClick={() => this.props.history.push("/")}>
                            Return to home page
                        </button>
                    </div>
                </div>
            )
        }

        const questionSet = this.props.questionSets[this.props.lobby.set_id]

        const lobbyNav = this.props.currentUser 
        && this.props.currentUser.id === this.state.creator ? 
        (<div className="lobby__top-bar">
            <div className="lobby__home-button red" onClick={this.handleCreatorExit}>
                <FontAwesomeIcon icon={faHome}/>
                <span className="hovertext">Cancel game and return to home screen</span>
            </div>
            <button className="lobby__invite">
                <span onClick={(e) => {
                    navigator.clipboard.writeText(`${this.props.lobby.room_id}`);
                    e.stopPropagation();
                    }}
                >Lobby ID: {this.props.lobby.room_id}&nbsp; <FontAwesomeIcon icon={faCopy}/></span>
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
            <div className="lobby__home-button white" onClick={() => this.props.history.push("/")}>
                <FontAwesomeIcon icon={faHome}/>
                <span className="hovertext">Exit game and return to home screen</span>
            </div>
            <div className="lobby__quiz-title">
                Lobby : <span>{questionSet ? (questionSet.title) : ("")}</span>
            </div>
        </div>)

        // Creates a list of the players currently in the lobby
        // { SOCKET OR DB id: ['human', 'username', DB id if they have one]}
        let lobbyPlayers;
        let gameChat;
         if (this.state.players) {
            const ids = Object.keys(this.state.players);

            lobbyPlayers = Object.values(this.state.players).map((playerDataArray, idx) => {
                return <li key={ids[idx]}>{playerDataArray[1]}</li>
            })

            gameChat = (
                 <GameChatContainer
                     socket={socket}
                     players={this.state.players}
                     socketId={this.state.socketId} />)

        } else {
            lobbyPlayers = (
                <div className="lobby__empty">
                    Waiting for more players to join...
                </div>
            )
            gameChat = '';
        }

        const gameOrLobby = this.state.playing 
        ?  (<GameView
                lobby={this.state.lobby}
                socket={socket}
                socketId={this.state.socketId}
                players={this.state.players}
                game={this.state.game}
                numPlayers={this.state.numPlayers}
                questions={this.state.questions}
                deleteLobby={this.props.deleteLobby}/>) 
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
                {gameChat}
            </div>
        )
    }
}

export default GameLobby;