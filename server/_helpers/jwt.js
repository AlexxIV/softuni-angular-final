const JWT = require('jsonwebtoken');
const SECRET = 'secretString';

module.exports = {
    verifyToken: (req) => {
        const TOKEN = req.headers.authorization.split(' ')[1];

        return new Promise((resolve, reject) => {
            JWT.verify(TOKEN, SECRET, (err, decoded) => {
                if (err) {
                    reject();
                }

                req.user = decoded.sub;
                resolve();
            });
        });
    },

    generateToken: (userInfo) => {
        const USER = {
            id: userInfo.id,
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            isAdmin: userInfo.isAdmin,
            isTeacher: userInfo.isTeacher,
            roles: userInfo.roles
        };
        const PAYLOAD = { sub: USER };

        return JWT.sign(PAYLOAD, SECRET, { expiresIn: 604800000 });
    }
};

