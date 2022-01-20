import React from "react";

// Simple component to redirect user to inputted lobby ID
class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state={ lobbyId: "" };
        this.update = this.update.bind(this);
        this.navToLobby = this.navToLobby.bind(this);
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    navToLobby(e) {
        e.preventDefault();
        this.props.history.push(`/play/${this.state.lobbyId}`)
    }

    render () {
        const {lobbyId} = this.state;

        return (
            <div className="with-nav new-qset-form-bg">
                <div className="new-qset-form edit-user-form">
                    <h2>Join a game!</h2>

                    <div className="edit-flex">
                        <label>Lobby ID:</label>
                        <input type="text" value={lobbyId} onChange={this.update("lobbyId")} />
                    </div>

                    <div className="join-game-buttons">
                            <button className="styled-button red-bg" 
                                onClick={() => this.props.history.push("/question-sets")}>Never mind</button>
                            <button className="styled-button orange-bg" 
                                onClick={this.navToLobby}>Let's go!</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default JoinGame;