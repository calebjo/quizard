import React from "react";
import "./question_edit.scss";
import EditQuestionSetFormContainer from "../question_set/edit_question_set_form_container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class QuestionEditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formQuestions: this.props.questions
        }
    }

    componentDidMount () {
        this.props.fetchQuestionSet(this.props.match.params.id)
            .then(({questionSet}) => {
                this.props.fetchSetQuestions(questionSet.data._id);
            });
    }

    addQuestion (e) {
        e.preventDefault();
    }

    render () {
        const {questionSet, currentUser} = this.props;
        const {formQuestions} = this.state;

        if (!questionSet || !currentUser || currentUser.id !== questionSet.creator_id) return null;

        const {title, description} = this.props.questionSet;
        const categories = ["Art and Literature", "Film and TV", "Food and Drink", "General Knowledge", "Geography", "History", "Mixed", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure"];


        return (
            <div className="with-nav question-edit">
                {/* Header */}
                <div className="question-edit-header">
                    <h6>Now editing:</h6>
                    <h1>{questionSet.title} &nbsp;<EditQuestionSetFormContainer /></h1>
                    <p>Description: {questionSet.description || "(none)"}</p>
                </div>

                {/* Individual questions */}
                <div className="question-edit-index">
                    {/* Questions that have already been made */}
                    {formQuestions.length === 0 ? (
                        <h5 className="no-questions">No questions yet!</h5>
                    ) : (
                        formQuestions.map((formQ, i) => (
                            <h5 key={`fq${i}`}>{formQ.question}</h5>
                        ))
                    )}
                    {/* New Question button */}
                    <button className="styled-button orange-bg">
                        <FontAwesomeIcon icon={faPlus} /> Add a question
                    </button>
                </div>
            </div>
        );
    }
}

export default QuestionEditForm;