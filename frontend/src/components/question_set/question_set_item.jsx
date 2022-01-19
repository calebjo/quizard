import React from 'react'

import { Link, withRouter, Redirect } from 'react-router-dom';
import {nanoid} from 'nanoid'; // generates a random id

// import GameLobbyContainer from '../game/game_lobby_container'


class QuestionSetItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            redirect: false
        }
        this.startLobby = this.startLobby.bind(this)
    }

    componentDidMount() {
        this.props.fetchSetQuestions(this.props.questionSet._id).then((response) => {
            this.setState({
                questions: response.questions.data
            })
        })
    }

    startLobby() {
        // SKELETON -- start a game with a random url string
        console.log(`Creating a lobby from a ${this.props.questionSet.category} set!`)
        this.setState({
            redirect: true
        })
    }

    render(){
        const lobbyId = nanoid(5)
        const redirect = this.state.redirect ? (
            <Redirect to={{
                pathname: `/play/${lobbyId}`,
                state: { 
                    questionSet: this.props.questionSet,
                    questions: this.state.questions,
                    lobbyId: lobbyId,
                    creator: this.props.currentUser
                    }
                }}
            />
        ) : (
            <></>
        )
        // Pluralize question number text
        const questionNumText = this.state.questions.length > 1 || this.state.questions.length === 0 ? (
            this.state.questions.length.toString() + " questions"
        ) : (
            this.state.questions.length.toString() + " question"
        )
        return(
            <div className="question-set-item">
                {redirect}
                <div className="question-set-item__container">
                    <div className="question-set-item__title">
                        <Link to={`/question-sets/${this.props.questionSet._id}`}>{this.props.questionSet.title}</Link>
                    </div>
                    <div className="question-set-item__details-container">
                        <div className="question-set-item__question-number">
                            { questionNumText }
                        </div>
                        <div className="question-set-item__category">
                            {this.props.questionSet.category}
                        </div>
                        <button 
                            className="question-set-item__start"
                            onClick={this.startLobby}>
                            Start a Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuestionSetItem);