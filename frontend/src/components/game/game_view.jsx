import React from "react";
import GameChatContainer from "./game_chat_container";
import Game from "./game"
import "./game.scss"

class GameView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            game: new Game(props.questions, props.players),
            roundActive: false,
        }
        this.handleGuess = this.handleGuess.bind(this)
    }

    handleGuess(number) {
        // SKELETON -- sets the user's guess to whichever number they picked
    }
    
    render() {
        const timeToAnswer = `30s` // SKELETON: change to whatever time you want (setTimeout likely needed in functions)
        const questionRound = (
            <div className="game__question-container">
                <div className="game__question-top">
                    <div className="game__question-text">
                        <p>{/* SKELETON -- INSERT QUESTION HERE */}</p>
                    </div>
                    <div className="game__timer" style={{animationDuration: `${timeToAnswer}`}} />
                </div>
                <div className="game__question-answers">
                    <div className="game__question-answer guess1" onClick={() => this.handleGuess(0)}>
                        <p>{/* SKELETON -- INSERT ANSWER HERE */}Mumbai</p>
                    </div>
                    <div className="game__question-answer guess2" onClick={() => this.handleGuess(1)}>
                        <p>{/* SKELETON -- INSERT ANSWER HERE */}New Delhi</p>
                    </div>
                    <div className="game__question-answer guess3" onClick={() => this.handleGuess(2)}>
                        <p>{/* SKELETON -- INSERT ANSWER HERE */}Jaipur</p>
                    </div>
                    <div className="game__question-answer guess4" onClick={() => this.handleGuess(3)}>
                        <p>{/* SKELETON -- INSERT ANSWER HERE */}Surat</p>
                    </div>
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
                    {/* SKELETON -- insert question set title */}
                    What is the capital of India?
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