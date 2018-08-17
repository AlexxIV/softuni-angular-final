const VALIDATOR = require('validator');

module.exports = {
    validateRegisterForm: (payload) => {
        let error = '';
        let isFormValid = true;

        if (!payload || typeof payload.email !== 'string' || !VALIDATOR.isEmail(payload.email)) {
            isFormValid = false;
            error = 'Please provide a correct email address.';
        }

        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
            isFormValid = false;
            error = 'Password must have at least 3 characters.';
        }

        if (!payload || payload.password !== payload.confirmedPassword) {
            isFormValid = false;
            error = 'Passwords do not match!';
        }

        if (!payload || typeof payload.firstname !== 'string' || payload.firstname.trim().length === 0) {
            isFormValid = false;
            error = 'Please provide your firstname.';
        }

        if (!payload || typeof payload.lastname !== 'string' || payload.lastname.trim().length === 0) {
            isFormValid = false;
            error = 'Please provide your lastname.';
        }

        return {
            success: isFormValid,
            error
        };
    },

    validateLoginForm: (payload) => {
        let error = '';
        let isFormValid = true;

        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
            isFormValid = false;
            error = 'Please provide your password.';
        }

        if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
            isFormValid = false;
            error = 'Please provide your name.';
        }

        return {
            success: isFormValid,
            error
        };
    }
}