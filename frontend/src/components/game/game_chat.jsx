import React from "react";
import "./game_chat.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faMinus } from '@fortawesome/free-solid-svg-icons';
// Displays messages that users have written in chat via webSocket connection
class GameChat extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            classList: "chat__container",
            toggled: true,
            message: "" ,
            messages: [],
            roomId: this.props.location.pathname.split("/")[2],
            user: {username: 'username'}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.addMessage = this.addMessage.bind(this)
        this.toggleModal = this.toggleModal.bind(this)

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

    toggleModal() {
        if (this.state.toggled) {
            this.setState({
                classList: "chat__container off"
            })
            setTimeout(() => {
                this.setState({
                    toggled: false
                })
            }, 55)
        } else {
            this.setState({
                classList: "chat__container",
                toggled: true
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

        const chatBox = this.state.toggled ? (
            <div className={this.state.classList}>
                <div className="chat__upper" onClick={this.toggleModal}>
                    <FontAwesomeIcon icon={ faMinus } size="2x" color="black"/>
                </div>
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
        ) : (
            <div className="chat__modal-open" onClick={this.toggleModal}>
                <FontAwesomeIcon icon={ faCommentAlt } size="2x" />
            </div>
        )
        return(
            chatBox
        )
    }
}

export default GameChat;