import React from "react";
import "./user.scss";
import UserShowQsetItem from "./user_show_qset_item";
import badgeBookBronze from "../../assets/images/badge-book-bronze.png"
import badgeBookSilver from "../../assets/images/badge-book-silver.png"
import badgeBookGold from "../../assets/images/badge-book-gold.png"
import badgeSwordBronze from "../../assets/images/badge-sword-bronze.png"
import badgeSwordSilver from "../../assets/images/badge-sword-silver.png"
import badgeSwordGold from "../../assets/images/badge-sword-gold.png"
import badgeHatBronze from "../../assets/images/badge-hat-bronze.png"
import badgeHatSilver from "../../assets/images/badge-hat-silver.png"
import badgeHatGold from "../../assets/images/badge-hat-gold.png"
import badgeHatRed from "../../assets/images/badge-hat-red.png"

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
        const {questionSets} = this.props;
        let badges = [];

        // badge depending on num of games played
        if (games_played > 100) {
            badges.push({badgeTitle: "Quizard", badgeDesc: "Quiz master! Played more than 100 games", src: badgeHatRed});
        } else if (games_played > 50) {
            badges.push({badgeTitle: "Elder", badgeDesc: "Played more than 50 games", src: badgeHatGold});
        } else if (games_played > 10) {
            badges.push({badgeTitle: "Master", badgeDesc: "Played more than 10 games", src: badgeHatSilver});
        } else {
            badges.push({badgeTitle: "Novice", badgeDesc: "Newbie alert! Played fewer than 10 games", src: badgeHatBronze});
        }

        // badge depending on wins/losses
        if (games_won === 0 /*&& games_played > 1*/) {
            badges.push({badgeTitle: "Sore Loser", badgeDesc: "Oof... Hasn't won a game yet", src: badgeSwordBronze});
        } else if ( games_won / games_played > 0.5) {
            badges.push({badgeTitle: "Formidable Opponent", badgeDesc: "Whoa! Won more than half of the games played", src: badgeSwordGold});
        } else if (games_won / games_played > 0.333 ) {
            badges.push({badgeTitle: "Tough to Beat", badgeDesc: "Nice going! Won more than a third of the games played", src: badgeSwordSilver});
        }

        // badge depending on number of question sets created
        if (questionSets.length >= 10) {
            badges.push({badgeTitle: "Prolific Scholar", badgeDesc: "Created 10 or more question sets", src: badgeBookGold});
        } else if (questionSets.length) {
            badges.push({badgeTitle: "Scholar", badgeDesc: "Created one or more question sets", src: badgeBookSilver});
        } else {
            badges.push({badgeTitle: "Provincial", badgeDesc: "Has not created any question sets", src: badgeBookBronze});
        }

        this.setState({badges: badges});
    }

    handleEdit (e) {
        e.preventDefault();
        this.props.history.push("/edit-profile");
    }

    render () {
        const {viewedUser, currentUser, questionSets, createLobby} = this.props;

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
                                <img src={badge.src} cx="50%" cy="50%" r="25" height="80" width="80"/>
                                <label>{badge.badgeTitle}</label>
                                <span className="hovertext">{badge.badgeDesc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="created-sets-container user-show-case">
                    <h4>Created Question Sets</h4>
                    {
                        questionSets.length > 0 ? (
                            questionSets.map((qset, i) => 
                                <UserShowQsetItem key={`qs${i}`} qset={qset} currentUser={currentUser} 
                                    createLobby={createLobby} history={this.props.history}/>)
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