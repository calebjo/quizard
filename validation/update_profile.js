const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUserUpdate(data) {
    let errors = {};

    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.old_password = validText(data.old_password) ? data.old_password : '';

    if (data.username === 'demouser' || data.email === 'demouser@mail.com') {
        errors.demouser = 'Tsk tsk... Who said you could do that?'
    }

    if (!Validator.isEmpty(data.old_password)) {

        if (Validator.isEmpty(data.password)) {
            errors.password = 'Password field is required';
        }

        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (Validator.isEmpty(data.password2)) {
            errors.password2 = 'Confirm Password field is required';
        }

        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = 'Passwords must match';
        }
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
        isUpdatingPassword: (data.old_password.length > 0 ? true : false)
    };
};