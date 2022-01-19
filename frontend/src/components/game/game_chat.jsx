import React from "react";
import "./game_chat.scss"
// Displays messages that users have written in chat via webSocket connection
class GameChat extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            message: "" ,
            messages: [],
            roomId: this.props.location.pathname.split("/")[2],
            user: {username: "DebugDude61"}// SKELETON -- hard coded for now, get current user when ready
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
        // debugger
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