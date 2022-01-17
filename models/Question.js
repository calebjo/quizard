const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    set_id: {
        type: Schema.Types.ObjectId,
        ref: "QuizSet"
    },
    category: {
        type: String, 
        require: true
    },
    question: {
        type: String,
        require: true
    },
    correctAnswer: {
        type: String,
        require: true
    },
    incorrectAnswers: {
        type: Array,
        require: true
    },
    type: {
        type: String,
        require: true
    }},
    { timestamps: true }
); 

module.exports = Question = mongoose.model("Question", QuestionSchema)