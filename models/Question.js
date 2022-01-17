const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    quiz_set_id: {
        type: Schema.Types.ObjectId,
        ref: "QuizSet"
    },
    category: {
        type: String, 
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    incorrectAnswers: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    }},
    { timestamps: true }
); 

module.exports = Question = mongoose.model("Question", QuestionSchema)