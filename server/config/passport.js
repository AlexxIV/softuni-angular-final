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
                email: req.body.email,
                password: req.body.password
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
                    return done(null, false);
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
                    return done(null, false);
                }

                if (!user.authenticate(password)) {
                    return done(null, false);
                }
                ROLE.findById(user.roles[0]).then((role) => {
                    userEmail = user.email;
                    firstname = user.firstname;
                    lastname = user.lastname;
                    token = JWT_HELPER.generateToken(user);
                    userRole = role.name;
                    return done(null, token, firstname, lastname, userRole, userEmail);
                })
            });
        }
        );
    }
};