const Validator = require('validator');
const validText = require('./valid-text');
const mongoose = require('mongoose');

module.exports = function validateQuestionSet(data) {
    let errors = {};

    const categories = ["Food and Drink", "Geography", "General Knowledge", "History", "Art and Literature", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure", "Mixed", "Film and TV"];

    if (!mongoose.isValidObjectId(data.creator_id)) {
        errors.creator_id = 'Invalid ID'
    }

    data.category = validText(data.category) ? data.category : '';

    if (!categories.includes(data.category)) {
        errors.category = 'Invalid Category'
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Category is required'
    }

    // Added by VK
    data.title = validText(data.title) ? data.title : '';
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};