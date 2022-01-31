import React from "react";
import { socket } from "../../util/socket_util";
import HumanPlayer from "./human_player";
import ComputerPlayer from "./computer_player";
import { withRouter } from "react-router-dom";
import "./game.scss"
import GameClock from "./game_clock";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

class GameView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lobbyId: props.lobby,
            questions: props.questions,
            roundActive: true,
            numPlayers: props.numPlayers,
            answers: null,
            socket: this.props.socket,
            clickable: true,
            currentRound: 0,
            correctAnswer: null,
            players: props.players,
            activePlayers: props.players,
            inactivePlayers: {},
            responses: [],
            gameOver: false,
        }

        this.timesUp = this.timesUp.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.shuffleAnswers = this.shuffleAnswers.bind(this);
        this.playRound = this.playRound.bind(this);
        this.roundCleanUp = this.roundCleanUp.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    timesUp() {
        const id = this.props.socketId;
        const responseObj = { [id]: '' };
        socket.emit('questionResponse', this.state.lobbyId, responseObj);
        this.setState({ clickable: false });
    }

    handleGuess(e) {
        e.preventDefault();
        const id = this.props.socketId;
        const response = e.target.innerText;
        const responseObj = { [id]: response };
        socket.emit('questionResponse', this.state.lobbyId, responseObj);
        this.setState({ clickable: false });
    }

    shuffleAnswers() {
        let answers = [];
        const question = this.state.questions[this.state.currentRound];
        answers.push(question.correctAnswer)
        question.incorrectAnswers.forEach(a => answers.push(a));
        let shuffledAnswers = answers.map(a => ({ a, sortKey: Math.random() })).sort((x, y) => (x.sortKey - y.sortKey)).map(idObject => idObject.a);
        return shuffledAnswers;
    }

    componentDidMount() {
        window.onbeforeunload = function () {
            socket.disconnect();
            return "Data will be lost if you leave the page, are you sure?";
        };

        const currentQuestion = this.state.questions[this.state.currentRound]
        const answers = this.shuffleAnswers(currentQuestion)
        const correctAnswer = currentQuestion.correctAnswer
        
        this.setState({answers, correctAnswer})
        socket.on('serverQuestionResponse', (localReplies) => {
            this.setState({ responses: localReplies })
            if (this.state.responses.length === this.state.numPlayers) {
                const currentQuestion = this.state.questions[this.state.currentRound]
                this.playRound(currentQuestion, this.state.responses);
                this.roundCleanUp();
                const answers = this.shuffleAnswers(currentQuestion)
                const correctAnswer = currentQuestion.correctAnswer
                this.setState({ roundActive: false, answers, correctAnswer })
                
            }
        })
    }

    componentWillUnmount() {
        socket.disconnect();
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
                if (activePlayers[player]) {
                    inactivePlayers[player] = activePlayers[player];
                    delete activePlayers[player];
                }
            })
        }

        this.setState({ activePlayers, inactivePlayers })
        return true;
    }

    roundCleanUp() {
        let currentRound = this.state.currentRound
        ++currentRound
        this.setState({ currentRound }, () => {
            this.gameOver();
        });
        socket.emit('clearResponses');
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

    gameOver() {
        const questions = this.state.questions
        if (this.state.currentRound >= (questions.length)) {
            this.setState({ gameOver: true, roundActive: false });
            this.props.deleteLobby(this.state.lobbyId);
            setTimeout(() => {
                this.props.history.push('/')
            }, 5000)
        }
    }

    
    render() {
        const currentQuestion = this.state.questions[this.state.currentRound]

        const options = this.state.answers ? this.state.answers.map((option, idx) => {
            return (
                <div className="game__question-answer guess1" onClick={this.handleGuess} >
                    <p key={idx}>{option}</p>
                </div>
            )
        }) : '';

        const questionRound = (
            <div className="game__container">
                <GameClock timesUp={this.timesUp}/>
                <div className="game__header">
                    {currentQuestion ? currentQuestion.question : ''}
                </div>
                <div className="game__question-answers">
                    {options ? options : ''}
                </div>
            </div>
        )

        // If the game is over, renders the number of players that survived, displaying their username(s).
        const survivorNum = Object.keys(this.state.activePlayers).length;
        let remainingPlayerText
        if (survivorNum > 1) {
            remainingPlayerText = `Only ${survivorNum} players survived!`
        } else if (survivorNum === 1) {
            remainingPlayerText = `Only 1 player survived!`
        } else {
            remainingPlayerText = 'No one survived...'
        }

        // NOTE: map needs the data formatted as an iterable (cannot iterate over duplicate keys)
        const survivors = Object.values(this.state.activePlayers);
        const survivorsElement = (
            survivors.map((survivor, idx) => {
                if (survivor) {
                return (
                    <div className="game__player-change survivor" key={idx}>
                        {survivor[1]}
                    </div>
                )} else {
                    return ''
                }
            })
        )
        const deadors = Object.values(this.state.inactivePlayers);
        const deadorsElement = (
            deadors.map((deador, idx) => {
                if (deador) {
                return (
                    <div className="game__player-change deador" key={idx}>
                        {deador[1]}
                    </div>
                )} else {
                    return ''
                }
            })
        )

        // At the end of each round, renders a screen showing the "dead" players
        const roundEnd = (
            <div className="game__round-end-container">
                <div className="game__round-end-top">
                    The correct answer was <span> {this.state.correctAnswer}</span>!
                </div>
                <div className="game__round-end-deadors">
                    <p>Let's see who didn't survive...</p>
                    <div className="game__round-end-players">
                        { deadorsElement }
                    </div>
                </div>
                
                <div className="game__round-end-survivors">
                    <p>Players remaining:</p>
                    <div className="game__round-end-players">
                        { survivorsElement }
                    </div>
                </div>
            </div>
        )

        // When the game ends, show the remaining players with conclusion text
        const gameEnd = (
            <div className="game__end-container">
                <FontAwesomeIcon 
                    icon={faTrophy} 
                    size="4x"
                    color="gold"
                />
                <div className="game__end-top">
                    <p>The game is over!</p>
                </div>
                <div className="game__winning-players">
                    <div className="game__winning-players-top">
                        <p>{ remainingPlayerText }</p>
                    </div>
                    <div className="game__winning-players-list">
                        { survivorsElement }
                    </div>
                </div>
            </div>
        )

        let display; 

        if (this.state.roundActive) {
            display = questionRound;
        } else if (!this.state.gameOver) {
            display = roundEnd;
            setTimeout(() => {
                this.setState({roundActive: true})
            }, 8000)
        } else {
            display = gameEnd;
        }

        // SKELETON -- when a round begins, render questionRound
        // -- when a round ends, render roundEnd
        // -- when the game ends, render gameEnd
        return(
            <div className="game__wrapper">
                {display}
            </div>
        )
    }
}

export default withRouter(GameView);