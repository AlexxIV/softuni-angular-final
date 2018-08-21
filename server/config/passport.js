const LOCAL_STRATEGY = require('passport-local').Strategy;
const JWT_HELPER = require('../_helpers/jwt');
const ENCRYPTION = require('../_helpers/encryption');

const ROLE = require('mongoose').model('Role');
const USER = require('mongoose').model('User');


module.exports = {
    localRegister: () => {
        return new LOCAL_STRATEGY({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        }, (req, email, password, done) => {
            let user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: email,
                password: req.body.password,
                personal_id: req.body.personal_id,
                school_name: req.body.school_name,
                student_class: req.body.student_class,
                teacher: null,
                classbook: null,
                schedule: null
            };
            let role = 'Student';
            if (req.body.isTeacher) {
                user.isTeacher = true
                role = 'Teacher'
            }

            let salt = ENCRYPTION.generateSalt();
            let hashedPassword = ENCRYPTION.generateHashedPassword(salt, password);

            user.salt = salt;
            user.password = hashedPassword;

            ROLE.findOne({ name: role }).then((role) => {
                user.roles = [role._id];

                USER.create(user).then((newUser) => {
                    role.users.push(newUser._id);
                    role.save();

                    return done(null);
                }).catch(() => {
                    return done('Registration Error', false);
                });
            });
        }
        );
    },

    localLogin: () => {
        return new LOCAL_STRATEGY({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        }, (email, password, done) => {
            USER.findOne({ email: email }).then((user) => {
                if (!user) {
                    return done('Invalid Credentials', false);
                }

                if (!user.authenticate(password)) {
                    return done('Invalid Credentials', false);
                }
                ROLE.findById(user.roles[0]).then((role) => {
                    userEmail = user.email;
                    firstname = user.firstname;
                    lastname = user.lastname;
                    token = JWT_HELPER.generateToken(user);
                    userRole = role.name;
                    userId = user._id;
                    return done(null, token, firstname, lastname, userRole, userEmail, userId);
                })
            });
        }
        );
    },

    passwordChange: () => {
        return new LOCAL_STRATEGY({
            usernameField: 'email',
            passwordField: 'oldPassword',
            session: false,
            passReqToCallback: true
        }, (req, email, oldPassword, done) => {
            USER.findOne({ email: email }).then((userToUpdate) => {
                if (!userToUpdate) {
                    return done('The user does not exist', false);
                }

                if (!userToUpdate.authenticate(oldPassword)) {
                    return done('Wrong Credentials', false);
                }

                let oldHashedPassword = ENCRYPTION.generateHashedPassword(userToUpdate.salt, oldPassword);

                if (userToUpdate.password === oldHashedPassword) {
                    let newHashedPassword = ENCRYPTION.generateHashedPassword(userToUpdate.salt, req.body.newPassword);
                    if (oldHashedPassword === newHashedPassword) {
                        return done("New password must be diffferent from old password", false);
                    }
                    userToUpdate.password = newHashedPassword;
                    userToUpdate.save();
                    return done(null);
                }
            })
        })
    }
};