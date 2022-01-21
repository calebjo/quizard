import React from "react";
import {socket} from "../../util/socket_util"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";
import HumanPlayer from "./human_player";
import ComputerPlayer from "./computer_player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// Establishes webSocket conneciton to every joining player
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
            currentRound: 0, 
            numPlayers: 0,
            activePlayers: {},
            inactivePlayers: {},
            responses: [],
        }

        this.startGame = this.startGame.bind(this);
        this.normalizeQuestions = this.normalizeQuestions.bind(this);
        this.playRound = this.playRound.bind(this);
        this.roundCleanUp = this.roundCleanUp.bind(this);
    }

    componentDidMount() {
        
          window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, are you sure?";
        };

        this.props.fetchLobby(this.props.match.params.id).then(({lobby}) => {
            this.props.fetchQuestionSet(lobby.data.set_id)
            this.props.fetchSetQuestions(lobby.data.set_id).then(questions => {
                let normalizedQuestions = this.normalizeQuestions(Object.values(questions.questions.data));
                if (normalizedQuestions.length > 10) {
                    normalizedQuestions = normalizedQuestions.slice(10, 20);
                }
                this.setState({ 
                    questions: normalizedQuestions,
                    creator: lobby.data.creator_id,
                    lobby: this.props.lobby.room_id, 
                })
            })

            socket.emit('joinRoom', this.props.lobby.room_id, this.props.currentUser)

            // on a new client connection, give them the game state data
            socket.on('playerJoined', (localClients, id) => {
                let players = Object.assign(...localClients);
                this.setState({ players })
                socket.emit('secondRound', this.props.lobby.room_id)
            })

            socket.on('userInfo', (id) =>{
                const socketId = id;
                this.setState({ socketId });
                console.log('test')
            })

            socket.on('sendToRecentClient', (localClients, id) => {
                let players = Object.assign(...localClients);
                
                this.setState({ players });
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

            socket.on('serverQuestionResponse', (localReplies) => {
                this.setState({ responses: localReplies })
                socket.emit('clientQuestionResponse', this.props.lobby.room_id)
            })

            socket.on('questionResponseHandshake', (localReplies) => {
                this.setState({ responses: localReplies}, () => {
                    if (this.state.responses.length === this.state.numPlayers) {
                        const currentQuestion = this.state.questions[this.state.currentRound]
                        this.playRound(currentQuestion, this.state.responses);
                        socket.emit('clearResponses')
                    }
                    
                })
            })

            // // update state whenever the lobby's state updates
            // socket.on('sendUpdatedState', () => {
            // })
        })
    }

    // componentWillUnmount() {
    //     socket.emit('disconnect')
    // }

    roundCleanUp() {
        let currentRound = this.state.currentRound
        ++currentRound
        this.setState({ currentRound });
        socket.emit('clearResponses')
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
        this.setState(stateObj)
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

    playRound(question, playerResponses) {
        // question should be a singular question object
        // responses should be an array of 'response objects'
        // e.g. [{ playerId: response }, { playerId: response }, { playerId: response }]

        const correctAnswer = question.correctAnswer;
        let removals = [];

        playerResponses.forEach(responseObj => {
            const player = Object.keys(responseObj)[0];
            const response = Object.values(responseObj)[0];
            if (response !== correctAnswer) {
                removals.push(player);
            }
        })

        const inactivePlayers = this.state.inactivePlayers;
        const activePlayers = this.state.activePlayers

        if (removals.length > 0) {
            removals.forEach(player => {
                inactivePlayers[player] = activePlayers[player];
                delete activePlayers[player];
            })
        }

        this.setState({ activePlayers, inactivePlayers })

        return true;
    }

    gameOver() {
        let result;
        this.round === this.totalRounds ? result = true : result = false;
        return result;
    }

    static createPlayers(players) {
        const playerIds = Object.keys(players)
        const playersObject = {};
        playerIds.forEach(id => {
            switch (players[id][0]) {
                case ('human'):
                    playersObject[id] = new HumanPlayer({ id: id, username: players[id][1] })
                    break;
                case ('computer'):
                    playersObject[id] = new ComputerPlayer({ id: id, username: players[id][1] })
                    break;
                default:
                    playersObject[id] = new HumanPlayer({ id: id, username: players[id][1] })
                    break;
            }
        })
        return playersObject
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
                Lobby ID: {this.props.lobby.room_id}&nbsp; 
                <span onClick={(e) => {
                    navigator.clipboard.writeText(`${this.props.lobby.room_id}`);
                    e.stopPropagation();
                    }}
                ><FontAwesomeIcon icon={faCopy} size="0.5x"/></span>
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
                sendData={this.getData}
                question={this.state.questions[this.state.currentRound]}/>) 
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