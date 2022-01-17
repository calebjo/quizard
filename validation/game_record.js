const mongoose = require('mongoose')

module.exports = function validateGameRecord(data) {
    let errors = {};

    const categories = ["Food and Drink", "Geography", "General Knowledge", "History", "Art and Literature", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure", "Mixed"];

    if (!mongoose.isValidObjectId(data.winner)) {
        errors.winner = 'Invalid Object id'
    }

    if (!categories.includes(data.category)) {
        errors.category = 'Invalid Category'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}