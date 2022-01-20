import React from "react";

const QuestionEditIndexItem = ({question, index, deleteQuestion}) => {
    return (
        <div className="question-index-container">
        <h6>Question {index + 1}:</h6>
        <div className="question-index-item">
            <h5>{question.question}</h5>
            <p>Correct answer: {question.correctAnswer}</p>
            <p>Incorrect answers:</p>
            <ul>
                {question.incorrectAnswers.map((ans) => <li>{ans}</li>)}
            </ul>
        </div>
        </div>
    );
};

export default QuestionEditIndexItem;