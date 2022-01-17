import React from "react";
import "./user.scss";

class UserShow extends React.Component {

    constructor(props) {
        super(props);

        // this will evenutally be subbed out for actual user's info via state props
        this.user = {
            username: "test_user",
            sets_created: [],
            games_played: 0,
            games_won: 0
        };

        this.badges = ["Creator"];
        this.needsBadges = true; // not necessary once componentDidMount is added

        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount () {
        // fetch viewed user info
        // THEN call getBadges and getquizsets
    }

    getBadges () {
        // update when user is derived from state props
        
        // badge depending on num of games played
        const {games_played} = this.user;
        if (games_played > 100) {
            this.badges.push("Quizard");
        } else if (games_played > 51) {
            this.badges.push("Elder");
        } else if (games_played > 10) {
            this.badges.push("Master");
        } else {
            this.badges.push("Novice");
        }
    }

    handleEdit (e) {
        e.preventDefault();
        this.props.history.push("/edit-profile"); // this is NOT nested under users/x since only current user's prof can be edited
    }

    render () {
        // update when user is derived from state props
        const {username, sets_created, games_played, games_won} = this.user;

        // remove when componentDidMount is added
        if (this.needsBadges) {
            this.getBadges();
            this.needsBadges = false;
        }

        return (
        <main className="user-show">
            {/* HEADER */}
            <div className="user-header">
                <div>
                    {/* user icon (will need to be updated to show photo instead if we add profile pics) */}
                    <svg height="125" width="125">
                        <circle cx="50%" cy="50%" r="60" fill="#ffbc42" />
                        <text x="50%" y="63%" textAnchor="middle" fill="white" fontSize="50px" 
                            fontWeight="800" fontFamily="Podkova">{username[0].toUpperCase()}</text>
                    </svg>
                    <h1>{username}</h1>
                </div>

                {/* Add conditional when state props present- empty div if not viewing current user profile */}
                <div>
                    <button className="styled-button orange-bg" onClick={this.handleEdit}>Edit Profile</button>
                </div>
            </div>

            {/* OTHER ELEMENTS - BADGES AND QUIZ SET INDEX */}
            <div className="flexed">
                <div className="badges-case user-show-case">
                    <h4>Badges</h4>

                    <div className="badges-container">
                        {this.badges.map((badge) => (
                            <div className="badge">
                                <svg height="55" width="55">
                                    <circle cx="50%" cy="50%" r="25" fill="#FB3754" />
                                    <text x="50%" y="60%" textAnchor="middle" fill="white" fontSize="18px">{badge[0].toUpperCase()}</text>
                                </svg>
                                <label>{badge}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="created-sets-container user-show-case">
                    <h4>Created Question Sets</h4>
                    <p>None yet!</p>
                </div>
            </div>
        </main>
        );
    }
}

export default UserShow;