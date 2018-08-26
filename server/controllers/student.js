const USER = require('mongoose').model('User');
const CLASSBOOK = require('mongoose').model('ClassBook');
const SCHEDULE = require('mongoose').model('Schedule');

module.exports = {
    getAllGrades: (req, res) => {
        CLASSBOOK.findOne({ owner: req.params.id })
            .populate('courses')
            .then((fullClassbook) => {
                return res.status(200).json({
                    courses: fullClassbook.courses
                });
            })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: 'No courses found!'
                })
            })
    },

    getSchedule: (req, res) => {
        USER.findById(req.params.id, ((err, user) => {
            SCHEDULE.findOne({ student_class: user.student_class })
                .then((weeklySchedule) => {
                    return res.status(200).json({
                        weeklySchedule: weeklySchedule
                    });
                })
                .catch((err) => {
                    return res.status(409).json({
                        success: false,
                        message: err.message
                    })
                })
        }))

    },

    getStudentInfo: (req, res) => {
        USER.findById(req.params.id)
            .populate('teacher')
            .then((currentUser) => {
                return res.status(200).json({
                    user: currentUser
                })
            })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                })
            })
    }
}