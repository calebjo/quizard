const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
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
    } 
}) 