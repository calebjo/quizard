import React from "react";
import "./question_edit.scss";
import EditQuestionSetFormContainer from "../question_set/edit_question_set_form_container";

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
                </div>

                {/* Individual questions */}
            </div>
        );
    }
}

export default QuestionEditForm;