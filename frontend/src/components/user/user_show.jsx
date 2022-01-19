import React from "react";
import "./user.scss";
import UserShowQsetItem from "./user_show_qset_item";

class UserShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            badges: []
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.getBadges = this.getBadges.bind(this);
    }

    componentDidMount () {
        this.props.fetchUserQuestionSets(this.props.match.params.id);
        this.props.fetchUser(this.props.match.params.id)
            .then(({user}) => {
                this.getBadges(user.data);});
    }

    getBadges (user) {
        const {games_played, games_won} = user;
        let badges = [];

        // badge depending on num of games played
        if (games_played > 100) {
            badges.push("Quizard");
        } else if (games_played > 51) {
            badges.push("Elder");
        } else if (games_played > 10) {
            badges.push("Master");
        } else {
            badges.push("Novice");
        }

        // badge depending on wins/losses
        if (games_won === 0 /*&& games_played > 1*/) {
            badges.push("Sore Loser");
        } else if ( games_won / games_played > 0.5) {
            badges.push("Formidable Opponent");
        }

        this.setState({badges: badges});
    }

    handleEdit (e) {
        e.preventDefault();
        this.props.history.push("/edit-profile");
    }

    render () {
        const {viewedUser, currentUser, questionSets} = this.props;

        if (!viewedUser) return null;

        const {username} = viewedUser;

        return (
        <main className="user-show with-nav">
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

                <div>
                    {currentUser && currentUser.id === viewedUser._id ? (
                        <button className="styled-button orange-bg" onClick={this.handleEdit}>Edit Profile</button>
                    ) : null}
                </div>
            </div>

            {/* OTHER ELEMENTS - BADGES AND QUIZ SET INDEX */}
            <div className="flexed">
                <div className="badges-case user-show-case">
                    <h4>Badges</h4>

                    <div className="badges-container">
                        {this.state.badges.map((badge, i) => (
                            <div key={`bdg${i}`} className="badge">
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
                    {
                        questionSets.length > 0 ? (
                            questionSets.map((qset) => <UserShowQsetItem qset={qset} />)
                        ) : (
                            <p>None yet!</p>
                        )
                    }
                </div>
            </div>
        </main>
        );
    }
}

export default UserShow;