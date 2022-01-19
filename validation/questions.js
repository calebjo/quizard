const Validator = require('validator');
const validText = require('./valid-text');
const mongoose = require('mongoose');

module.exports = function validateQuestion(data) {
    let errors = {};
    const categories = ["Food and Drink", "Geography", "General Knowledge", "History", "Art and Literature", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure"];
    const types = ["Multiple Choice", "True or False"];
     
    data.category = validText(data.category) ? data.category : '';
    data.question = validText(data.question) ? data.question : '';
    data.correctAnswer = validText(data.correctAnswer) ? data.correctAnswer : '';
    data.type = validText(data.type) ? data.type : '';

    if (!mongoose.isValidObjectId(data.set_id)) {
        errors.set_id = 'Invalid set id'
    }

    if (!categories.includes(data.category)) {
        errors.category = 'Invalid Category'
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Category is required'
    }

    if (Validator.isEmpty(data.question)) {
        errors.question = 'Question is required'
    }

    if (Validator.isEmpty(data.correctAnswer)) {
        errors.correctAnswer = 'Correct answer is required'
    }

    if (data.incorrectAnswers.length < 1) {
        errors.incorrectAnswers = 'Incorrect answers are required'
    }

    if (!types.includes(data.type)) {
        errors.type = 'Invalid question type'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}