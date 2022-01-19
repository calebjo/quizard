import React from "react";
import { Link } from "react-router-dom";

const UserShowQsetItem = ({qset}) => {
    return (
        <div className="user-qset-index">
            <Link to={`/question-sets/${qset._id}`}><p>{qset.title}</p></Link>
            
            <div>
                <p>{qset.category}</p>
                <button className="red-bg small-button">Start Game</button>
            </div>
        </div>
    );
} 

export default UserShowQsetItem;