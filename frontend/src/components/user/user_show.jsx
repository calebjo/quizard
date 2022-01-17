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
    }

    componentDidMount () {
        // fetch viewed user info
        // call getBadges
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

    render () {
        // update when user is derived from state props
        const {username, sets_created, games_played, games_won} = this.user;

        // remove when componentDidMount is added
        this.getBadges();

        return (
        <main className="user-show">
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
                    <button className="styled-button orange-bg">Edit Profile</button>
                </div>
            </div>

            <div className="badges-case">
                <h4>Badges</h4>

                <div className="badges-container">
                    {this.badges.map((badge) => (
                        <div className="badge">
                            <svg height="55" width="55">
                                <circle cx="50%" cy="50%" r="25" fill="#FB3754" />
                                <text x="50%" y="60%" textAnchor="middle" fill="#111" fontSize="18px">{badge[0].toUpperCase()}</text>
                            </svg>
                            <label>{badge}</label>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        );
    }
}

export default UserShow;