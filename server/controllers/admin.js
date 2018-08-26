const USER = require('mongoose').model('User');

module.exports = {
    getAll: (req, res) => {
        USER.find()
            .populate('roles')
            .then((users) => {
                let admins = []
                let teachers = []
                let students = []
                users.forEach(user => {
                    if (user.roles[0].name === 'Admin') {
                        admins.push(user);
                    }
                    else if (user.roles[0].name === 'Teacher') {
                        teachers.push(user);
                    }
                    else {
                        students.push(user);
                    }
                });
                return res.status(200).json({
                    admins: admins,
                    teachers: teachers,
                    students: students
                })
            })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                })
            })
    },

    delete: (req, res) => {
        USER.findByIdAndRemove(req.params.id)
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Successfully deleted!'
                })
            })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            })
    },
}