import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

class QuestionEditIndexItem extends React.Component {
    constructor(props) {
        super(props);

        const {question} = this.props;
        this.state = {
            hidden: true,
            question: question.question,
            correctAnswer: question.correctAnswer,
            incorrect1: question.incorrectAnswers[0], 
            incorrect2: question.incorrectAnswers[1],  
            incorrect3: question.incorrectAnswers[2],
            type: question.type,
            set_id: question.set_id,
            category: question.category,
            id: question._id
        }

        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
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
        const stateData = (({question, correctAnswer, type, set_id, category, id}) => 
            ({question, correctAnswer, type, set_id, category, id}))(this.state);
        // combine fields to send to backend
        const updateData = Object.assign(stateData,  {incorrectAnswers}, {});

        console.log(updateData);

        this.props.updateQuestion(updateData)
            .then(() => {
                if (Object.values(this.props.errors).length === 0) this.setState({hidden: true});
            })
    }

    render () {
        const {question, index, deleteQuestion, errors} = this.props;
        const {hidden, correctAnswer, incorrect1, incorrect2, incorrect3} = this.state;
        const questionText = this.state.question;

        // Error messages
        let errorMsg;
        if (Object.values(errors).length) {
            errorMsg = Object.values(errors).map((error, i) => (
                <p key={`err${i}`} className="errortxt">{error}</p>
            ))
        }

        // Edit form
        const editForm = (
            <div className="edit-modal" onClick={this.hide}>
                <div className="add-question-form" onClick={e => e.stopPropagation()}>
                    <div onClick={this.hide} className="close-button">
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </div>

                    {errorMsg}

                    <form>
                        
                        <label>Question text:</label>
                        <input type="text" value={questionText} onChange={this.update("question")} />

                    
                        <label className="green">Correct answer:</label>
                        <input type="text" value={correctAnswer} onChange={this.update("correctAnswer")}
                            className="correct" />

                        <label className="red">Incorrect answers:</label>
                        <div className="edit-flex">
                            <input type="text" value={incorrect1} onChange={this.update("incorrect1")} />
                            <input type="text" value={incorrect2} onChange={this.update("incorrect2")} />
                            <input type="text" value={incorrect3} onChange={this.update("incorrect3")} />
                        </div>

                        <div className="edit-buttons">
                            <button className="styled-button orange-bg" 
                                onClick={this.handleSubmit}>Update question</button>
                        </div>
                    </form>
                </div>
            </div>
        )

        return (
            <div className="question-index-container">
                <div>
                    <h6>Question {index + 1}</h6>
                    <button onClick={this.reveal} className="idx-button edit-button">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => deleteQuestion(question._id)} className="idx-button">
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>

                <div className="question-index-item">
                    <h5>{question.question}</h5>

                    <div className="flex-this">
                        <div>
                            <p className="green">Correct answer:</p> 
                            <ul><li>{question.correctAnswer}</li></ul>
                        </div>
                        <div>
                            <p className="red">Incorrect answers:</p>
                            <ul>
                                {question.incorrectAnswers.map((ans, i) => <li key={i}>{ans}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                {hidden ? null : editForm }
            </div>
        );
    }
}

export default QuestionEditIndexItem;