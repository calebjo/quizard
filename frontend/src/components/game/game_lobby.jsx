import React from "react";
import {socket} from "../app"
import "./game.scss"
import GameChatContainer from "./game_chat_container";
import GameView from "./game_view";

// Establishes webSocket conneciton to every joining player
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        
        const debugPlayers = {
            _id: "ASD1i",
            _id: "Quizard1530",
            _id: "SPONGEBOBSQUAREPANTS",
            _id: "quizlord02"
        }
        // SKELETON -- debugPlayers needs to be replaced with actual players
        this.state = {
            creator: null,
            questionSet: this.props.location.state.questionSet,
            questions: this.props.location.state.questions,
            playing: false,
            players: debugPlayers
        }
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        window.onbeforeunload = function() {
            return "Data will be lost if you leave the page, are you sure?";
        };
    }

    startGame() {
        this.setState({
            playing: true
        })
    }
    
    render() {

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
                            Lobby : <span>{this.state.questionSet.title}</span>
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
                <GameChatContainer 
                    socket={socket}/>
            </div>
        )

        return(
            gameOrLobby
        )
    }
}

export default GameLobby;