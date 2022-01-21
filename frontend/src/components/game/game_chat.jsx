import React from "react";
import "./game_chat.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
// Displays messages that users have written in chat via webSocket connection
class GameChat extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            message: "" ,
            messages: [],
            roomId: this.props.location.pathname.split("/")[2],
            user: {username: 'username'}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.addMessage = this.addMessage.bind(this)

        this.props.socket.on('message', (message, user, roomId) => {
            if (roomId === this.state.roomId) {
                this.addMessage(message, user)
            }
        })
    }

    componentDidMount() {
        const players = this.props.players;
        const socketId = this.props.socketId;
        const userArray = players[socketId];
        const username = userArray[1];
        this.setState({user: { username }});
    }

    addMessage(message, user) {
        const newMessages = this.state.messages
        newMessages.unshift({
            user: user,
            text: message
        })
        this.setState({
            messages: newMessages
        })
    }

    update(e){
        this.setState({
            message: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.message.length > 0) {
            this.props.socket.emit('chatMessage', this.state.message, this.state.user, this.state.roomId)
            this.state.messages.unshift({
                user: this.state.user,
                text: this.state.message
            })
            this.setState({
                message: ""
            })
        }
    }
    
    render() {
        const messageList = this.state.messages.length > 0 ? (
            this.state.messages.map((message, idx) => {
                return (
                    <div className="chat__message" key={idx}>
                        <p>{ message.user.username }: { message.text }</p>
                    </div>
                )
            })
        ) : (
            <div className="chat__no-messages">
                <div className="chat__no-messages-inner">
                    <FontAwesomeIcon icon={ faCommentAlt } size="6x" />
                    <div className="no-messages__text">
                        Say hello!
                    </div>
                </div>
            </div>
        )
        return(
            <div className="chat__container">
                <div className="chat__body">
                    { messageList }
                </div>
                <div className="chat__lower">
                    <form 
                        className="chat__input"
                        onSubmit={this.handleSubmit}>
                        <input 
                            className="chat__text"
                            type="text"
                            value={this.state.message}
                            onChange={this.update}
                        />
                        <input 
                            className="chat__submit"
                            type="submit"
                            value=""
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default GameChat;