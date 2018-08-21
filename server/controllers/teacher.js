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
    },

    getSchedule: (req, res) => {
        SCHEDULE.findOne({ owner: req.params.id })
            .then((weeklySchedule) => {
                return res.status(200).json({
                    weeklySchedule: weeklySchedule
                });
            })
    },

    getStudentInfo: (req, res) => {
        USER.findById(req.params.id)
            .populate('teacher')
            .then((currentUser) => {
                return res.status(200).json({
                    user: currentUser
                })
            })
    }
}