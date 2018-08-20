const USER = require('mongoose').model('User');
const CLASSBOOK = require('mongoose').model('ClassBook');
const SCHEDULE = require('mongoose').model('Schedule');

module.exports = {
    getAllGrades: (req, res) => {
        USER.findById(req.params.id)
            .then((currentUser) => {
                CLASSBOOK.findOne({ owner: currentUser._id })
                    .populate('courses')
                    .then((fullClassbook) => {
                        return res.status(200).json({
                            courses: fullClassbook.courses
                        });
                    })
            })
    },

    getSchedule: (req, res) => {
        USER.findById(req.params.id)
            .then((currentUser) => {
                SCHEDULE.findOne({ owner: currentUser._id })
                    .then((weeklySchedule) => {
                        return res.status(200).json({
                            weeklySchedule: weeklySchedule
                        });
                    })
            })
    }
}