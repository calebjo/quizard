import React from "react";
import { connect } from "react-redux";

const GameCancelled = ({history}) => {

    return (
        <main className="splash-page__main">
            <div className="session-form-background">
                <div className="session-form-content">
                    <h1 className="orange">Abracadabra... POOF!</h1>
                    <h6>Looks like the host has made this game vanish.</h6>
                    <div>
                        <button className="styled-button red-bg" onClick={() => history.push("/join-game")}>
                            Join another game
                        </button>
                        <button className="styled-button orange-bg" onClick={() => history.push("/")}>
                            Return to home page
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

const mSTP = (state, {history}) => ({
    history
})

export default connect(mSTP)(GameCancelled);