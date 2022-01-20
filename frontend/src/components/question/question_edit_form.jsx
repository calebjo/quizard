import React from "react";
import "./question_edit.scss";
import EditQuestionSetFormContainer from "../question_set/edit_question_set_form_container";
import AddQuestionFormContainer from "./add_question_form_container";
import QuestionEditIndexItem from "./question_edit_index_item";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class QuestionEditForm extends React.Component {
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
        const {questionSet, currentUser, questions} = this.props;

        if (!questionSet || !currentUser || currentUser.id !== questionSet.creator_id) return null;

        return (
            <div className="with-nav question-edit">
                {/* Header */}
                <div className="header-container">

                    <div className="question-edit-header">
                        <div className="back-arrow" onClick={() => this.props.history.push(`/question-sets/${questionSet._id}`)}>
                            <FontAwesomeIcon icon={faArrowLeft} size="3x" />
                        </div>

                        <div>
                            <h6>Now editing:</h6>
                            <h1>{questionSet.title} &nbsp;<EditQuestionSetFormContainer /></h1>
                            <p>Description: {questionSet.description || "(none)"}</p>
                        </div>
                    </div>
                </div>

                {/* Individual questions */}
                <div className="question-edit-index">
                    {/* Questions that have already been made */}
                    {questions.length === 0 ? (
                        <h5 className="no-questions">No questions yet!</h5>
                    ) : (
                        questions.map((formQ, i) => (
                            <QuestionEditIndexItem key={`fq${i}`} question={formQ} index={i}
                                deleteQuestion={this.props.deleteQuestion} />
                        ))
                    )}
                    {/* New Question button */}
                    <AddQuestionFormContainer questionSet={questionSet} />
                </div>
            </div>
        );
    }
}

export default QuestionEditForm;