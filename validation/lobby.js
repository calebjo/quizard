const Validator = require('validator');
const validText = require('./valid-text');
const mongoose = require('mongoose');

module.exports = function validateLobby(data) {
    let errors = {};

    data.creator_id = validText(data.creator_id) ? data.creator_id : '';
    data.room_id = validText(data.room_id) ? data.room_id : '';

    if (Validator.isEmpty(data.creator_id)) {
        errors.creator_id = 'Category is required'
    }

    if (Validator.isEmpty(data.room_id)) {
        errors.room_id = 'Question is required'
    }

    if (!mongoose.isValidObjectId(data.set_id)) {
        errors.set_id = 'Invalid set id'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}