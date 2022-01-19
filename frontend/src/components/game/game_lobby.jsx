import React from "react";
import {socket} from "../app"
// GETs questions from database based on this.props.questionSet
// Establishes webSocket conneciton to every joining player
class GameLobby extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            creator: null,
            players: []
        }
    }

    componentDidMount() {
        // First player to join becomes the creator
        // debugger
        socket.on('message', message => {
            console.log(message)
        })
        if (!this.state.creator) {
            this.setState({
                // creator: this.props.state.session
            })
        }
    }
    
    render() {
        const lobbyPlayers = null;
        return(
            <div className="lobby__container">
                <div className="lobby__quit">
                </div>
                <div className="lobby__body">
                    <div className="lobby__top-bar">
                        <div className="lobby__invite">
                            {/* Pops out lobby invite modal, generating 5 digit code */}
                        </div>
                        <div className="lobby__quiz-title">
                            Testing title!
                            {/* Lobby for: <span>{this.props.questionSet.title}</span> */}
                        </div>
                        <div className="lobby__start">
                        </div>
                    </div>
                    <div className="lobby__players-large">
                    </div>
                </div>
            </div>
        )
    }
}

export default GameLobby;