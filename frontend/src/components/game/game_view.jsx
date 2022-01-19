import React from "react";
import GameChatContainer from "./game_chat_container";
import Game from "./game"
import "./game.scss"

class GameView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            roundActive: false,
            // SKELETON -- real players and proper number of questions needed
            game: new Game(this.props.questions.slice[44], this.props.players)
        }
    }
    
    render() {
        const guessScreen = null;
        return(
            <div className="game__container">
                <GameChatContainer />
            </div>
        )
    }
}

export default GameView;