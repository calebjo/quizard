import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const QuestionEditIndexItem = ({question, index, deleteQuestion}) => {
    return (
        <div className="question-index-container">
            <div>
                <h6>Question {index + 1}</h6>
                <button onClick={() => deleteQuestion(question._id)}>
                    <FontAwesomeIcon icon={faTrash} size="2x"/>
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
        </div>
    );
};

export default QuestionEditIndexItem;