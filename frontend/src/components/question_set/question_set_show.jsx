import React from "react";
import { Link } from 'react-router-dom';
import "./question_set_show.scss";

class QuestionSetShow extends React.Component {

    componentDidMount () {
        this.props.fetchQuestionSet(this.props.match.params.id)
            .then(({questionSet}) => {
                this.props.fetchUser(questionSet.data.creator_id);
                this.props.fetchSetQuestions(questionSet.data._id);
            });
    }

    render () {
        const {questionSet, users, questions, currentUser} = this.props;
        if (!questionSet) return null;

        console.log(questionSet);

        // Get associated user, question data
        const creator = users[questionSet.creator_id] || {username: "", _id: 0};
        const questionCount = questions.filter((question) => question.set_id === questionSet._id).length;

        // Edit button for if set belongs to current user
        const editButton = (currentUser && currentUser.id === questionSet.creator_id) ? (
            <button className="styled-button yellow-bg">Edit Set</button>
        ) : null;

        return (
            <main className="with-nav qset-show raised">
                <h1>{questionSet.title}</h1>

                <div className="qset-flex">
                    <div>
                        <p>Description: {questionSet.description || "(none)"}</p>
                        <p>{questionCount} questions</p>

                        <div className="qset-flex">
                            <h5 className="raised">Category: {questionSet.category}</h5>
                            <Link to={`/users/${creator._id}`}>
                                <h5 className="raised">Creator: {creator.username}</h5>
                            </Link>
                        </div>
                    </div>

                    <div className="button-holder">
                        <button className="styled-button red-bg">Start Game</button>
                        {editButton}
                    </div>

                </div>
            </main>
        );
    }
}

export default QuestionSetShow;