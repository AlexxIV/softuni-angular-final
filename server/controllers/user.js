const PASSPORT = require('passport');
const FORM_VALIDATOR = require('../_helpers/formValidator');


module.exports = {
    register: (req, res) => {
        let validationResult = FORM_VALIDATOR.validateRegisterForm(req.body);

        if (!validationResult.success) {
            return res.status(409).json({
                success: false,
                message: validationResult.error
            });
        }

        PASSPORT.authenticate('local-register', (err) => {
            if (err) {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            }

            return res.json({
                success: true,
                message: 'Registration successful!',
                // token: token
            });
        })(req, res);
    },

    login: (req, res) => {
        let validationResult = FORM_VALIDATOR.validateLoginForm(req.body);

        if (!validationResult.success) {
            return res.status(409).json({
                success: false,
                message: validationResult.error
            });
        }

        PASSPORT.authenticate('local-login', (err, token, username) => {
            if (err || !token) {
                return res.status(409).json({
                    success: false,
                    message: 'Invalid Credentials!'
                });
            }
            return res.json({
                success: true,
                message: 'Login successful!',
                token: token,
                firstname: firstname,
                lastname: lastname,
                userRole: userRole,
                userEmail: userEmail,
                userId: userId
            });
        })(req, res);
    },

    changePassword: (req, res) => {
        let validationResult = FORM_VALIDATOR.validatePasswordChangeForm(req.body);

        if (!validationResult.success) {
            return res.status(409).json({
                success: false,
                message: validationResult.error
            });
        }

        PASSPORT.authenticate('password-change', (err) => {
            if (err) {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Password changed successful!'
            });
        })(req, res);
    }
};