import React from "react";
import { Link } from "react-router-dom";
import {nanoid} from 'nanoid'; // generates a random id

class UserShowQsetItem extends React.Component {
    constructor(props) {
        super(props);
        this.startLobby = this.startLobby.bind(this);
    }

    startLobby(e) {
        e.preventDefault();
        // console.log(`Creating a lobby from a ${this.props.qset.category} set!`);

        const creator_id = this.props.currentUser.id;
        const set_id = this.props.qset._id;
        const room_id = nanoid(5);

        this.props.createLobby({ creator_id, set_id, room_id }).then(() => {
            this.props.history.push(`/play/${room_id}`)
        })
    }

    render () {
        const {qset} = this.props;
        return (
            <div className="user-qset-index">
                <Link to={`/question-sets/${qset._id}`}><p>{qset.title}</p></Link>
                
                <div>
                    <p>{qset.category}</p>
                    <button className="red-bg small-button" onClick={this.startLobby}>Start Game</button>
                </div>
            </div>
        );
    }
} 

export default UserShowQsetItem;