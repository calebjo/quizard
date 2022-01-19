import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import "./add_question_form.scss";

class AddQuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            question: "",
            correctAnswer: "",
            incorrect1: "", incorrect2: "", incorrect3: ""
        }

        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearQuestionErrors();
    }

    reveal (e) {
        e.preventDefault();
        this.setState({hidden: false});
        e.stopPropagation();
    }

    hide (e) {
        e.preventDefault();
        this.setState({hidden: true});
        this.props.clearQuestionErrors();
        e.stopPropagation();
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // put incorrect answers into array
        const incorrectAnswers = [this.state.incorrect1, this.state.incorrect2, this.state.incorrect3];
        // pull other fields from state
        const stateData = (({question, correctAnswer}) => ({question, correctAnswer}))(this.state);
        // these are not editable
        const nonEditableData = {
                type: "Multiple Choice",
                set_id: this.props.questionSet._id, 
                category: this.props.questionSet.category};
        // all data sent to backend for question creation
        const newData = Object.assign(stateData, nonEditableData, {incorrectAnswers});

        this.props.createQuestion(newData)
            .then(() => {
                if (Object.values(this.props.errors).length === 0) {
                    this.setState({hidden: true});
                }
            })
    }

    render () {
        const {errors} = this.props;
        const {hidden, question, correctAnswer, incorrect1, incorrect2, incorrect3} = this.state;

        // Error messages
        let errorMsg;
        if (Object.values(errors).length > 0) {
            errorMsg = Object.values(errors).map((error, i) => (
                <p key={`err${i}`} className="errortxt">{error}</p>
            ))
        }

        if (hidden) {
            return (
                <button className="styled-button orange-bg" onClick={this.reveal}>
                    <FontAwesomeIcon icon={faPlus} /> Add a question
                </button>
            )
        } else {
            return (
            <>
                <button className="styled-button orange-bg">
                    <FontAwesomeIcon icon={faPlus} /> Add a question
                </button>
                <div className="edit-modal" onClick={this.hide}>
                    <div className="add-question-form" onClick={e => e.stopPropagation()}>
                        <div onClick={this.hide} className="close-button">
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </div>

                        {errorMsg}

                        <form>
                            
                            <label>Question text:</label>
                            <input type="text" value={question} onChange={this.update("question")} />

                        
                            <label>Correct answer:</label>
                            <input type="text" value={correctAnswer} onChange={this.update("correctAnswer")} />

                            <label>Incorrect answers:</label>
                            <div className="edit-flex">
                                <input type="text" value={incorrect1} onChange={this.update("incorrect1")} />
                                <input type="text" value={incorrect2} onChange={this.update("incorrect2")} />
                                <input type="text" value={incorrect3} onChange={this.update("incorrect3")} />
                            </div>

                            <div className="edit-buttons">
                                <button className="styled-button orange-bg" 
                                    onClick={this.handleSubmit}>Add question</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            )
        }
    }
}

export default AddQuestionForm;