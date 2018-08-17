const ROLE = require('mongoose').model('Role');
const JWT_HELPER = require('../_helpers/jwt');

module.exports = {
    isAuth: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'You need to be logged in to access this!'
            });
        }

        JWT_HELPR.verifyToken(req).then(() => {
            next();
        }).catch(() => {
            return res.status(401).json({
                message: 'Token verification failed!'
            });
        });
    },

    isInRole: (role) => {
        return (req, res, next) => {
            if (req.headers.authorization) {
                ROLE.findOne({ name: role }).then((role) => {
                    JWT_HELPER.verifyToken(req).then(() => {
                        let isInRole = req.user.roles.indexOf(role.id) !== -1;

                        if (isInRole) {
                            next();
                        } else {
                            return res.status(401).json({
                                message: 'You need to be an admin to access this!'                          
                            });
                        }
                    }).catch(() => {
                        return res.status(401).json({
                            message: 'Token verification failed!'
                        });
                    });
                });
            } else {
                return res.status(401).json({
                    message: 'You need to be logged in to access this!'
                });
            }
        };
    }
};