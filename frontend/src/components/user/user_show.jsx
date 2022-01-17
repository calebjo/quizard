import React from "react";
import "./user.scss";

class UserShow extends React.Component {

    constructor(props) {
        super(props);

        // this will evenutally be subbed out for actual user's info via state props
        this.user = {
            email: "test@gmail.com", 
            username: "test_user",
            sets_created: [],
            games_played: 0,
            games_won: 0
        };
    }

    componentDidMount () {
        // fetch viewed user info
    }

    render () {
        const {email, username, sets_created, games_played, games_won} = this.user;

        return (
        <main className="user-show">
            <p>text text text</p>
        </main>
        );
    }
}

export default UserShow;