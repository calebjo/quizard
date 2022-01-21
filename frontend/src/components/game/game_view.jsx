import React from "react";
import { socket } from "../../util/socket_util";
import "./game.scss"

class GameView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lobbyId: props.lobby,
            question: props.question,
            roundActive: false,
            answers: null,
            socket: this.props.socket,
            clickable: true
        }

        this.handleGuess = this.handleGuess.bind(this)
        this.shuffleAnswers = this.shuffleAnswers.bind(this)
    }

    handleGuess(e) {
        e.preventDefault();
        const id = this.props.socketId;
        const response = e.target.innerText;
        const responseObj = { [id]: response }
        socket.emit('questionResponse', this.state.lobbyId, responseObj)
        this.setState({ clickable: false })
    }

    shuffleAnswers() {
        let answers = [];
        const question = this.state.question;
        answers.push(question.correctAnswer)
        question.incorrectAnswers.forEach(a => answers.push(a));
        let shuffledAnswers = answers.map(a => ({ a, sortKey: Math.random() })).sort((x, y) => (x.sortKey - y.sortKey)).map(idObject => idObject.a);
        return shuffledAnswers;
    }

    componentDidMount() {
        this.setState({answers: this.shuffleAnswers(this.state.question)})
    }
    
    render() {
        let clickable = this.state.clickable ? this.handleGuess : '';
        const timeToAnswer = `30s` // SKELETON: change to whatever time you want (setTimeout likely needed in functions)

        const options = this.state.answers ? this.state.answers.map((option, idx) => {
            return (
                <div className="game__question-answer guess1" onClick={clickable} >
                    <p key={idx}>{option}</p>
                </div>
            )
        })  : '';

        const questionRound = (
            <div className="game__question-container">
                <div className="game__question-top">
                    <div className="game__question-text">
                        <p>{/* SKELETON -- INSERT QUESTION HERE */}</p>
                    </div>
                    <div className="game__timer" style={{animationDuration: `${timeToAnswer}`}} />
                </div>
                <div className="game__question-answers">
                    {options}
                </div>
            </div>
        )

        // If the game is over, renders the number of players that survived, displaying their username(s).
        const survivorNum = 1 // SKELETON -- change to number of activePlayers in game instance
        let remainingPlayerText
        if (survivorNum > 1) {
            remainingPlayerText = `Only ${survivorNum} players survived!`
        } else if (survivorNum === 1) {
            remainingPlayerText = `Only 1 player survived!`
        } else {
            remainingPlayerText = 'No one survived...'
        }

        // SKELETON -- delete debugSurvivors and pass in the activePlayers from the game
        // NOTE: map needs the data formatted as an iterable (cannot iterate over duplicate keys)
        const debugSurvivors = [{username: "johnDEBUGGEr0131"}, {username: "QuizLord7"}]
        const survivors = (
            debugSurvivors.map((survivor, idx) => {
                return (
                    <div className="game__survivor" key={idx}>
                        {survivor.username}
                    </div>
                )
            })
        )

        // At the end of each round, renders a screen showing the "dead" players
        const roundEnd = (
            <div className="game__round-end-container">
                <div className="game__round-end-top">
                    Time's up! Let's see the results...
                </div>
                <div className="game__round-end-players">
                    {/* SKELETON -- map over all players, showing inactive ones as "dead" */}
                </div>
            </div>
        )

        // When the game ends, show the remaining players with conclusion text
        const gameEnd = (
            <div className="game__end-container">
                <div className="game__end-top">
                    <p>The game is over!</p>
                </div>
                <div className="game__winning-players">
                    <div className="game__winning-players-top">
                        <p>{ remainingPlayerText }</p>
                    </div>
                    <div className="game__winning-players-list">
                        { survivors }
                    </div>
                </div>
            </div>
        )

        // SKELETON -- when a round begins, render questionRound
        // -- when a round ends, render roundEnd
        // -- when the game ends, render gameEnd
        return(
            <div className="game__container">
                <div className="game__header">
                    {this.state.question.question}
                </div>
                <div className="game__content">
                    {questionRound}
                    {/* roundEnd */}
                    {/* gameEnd */}
                </div>
            </div>
        )
    }
}

export default GameView;