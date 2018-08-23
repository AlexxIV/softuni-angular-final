const USER = require('mongoose').model('User');
const CLASSBOOK = require('mongoose').model('ClassBook');
const COURSE = require('mongoose').model('Course');
const SCHEDULE = require('mongoose').model('Schedule');

module.exports = {
    getTeacherInfo: (req, res) => {
        USER.findOne({ _id: req.params.id })
            .populate({
                path: 'teacher_class',
                model: 'User'
                // populate: {
                //   path: 'classbook',
                //   populate: {
                //       path: 'courses',
                //       model: 'Course'
                //   }
                // } 
            })
            .then((teacherWithClass) => {
                return res.status(200).json({
                    teacher: teacherWithClass
                });
            })
    },

    deleteStudent: (req, res) => {
        USER.findByIdAndRemove(req.params.id)
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Successfuly deleted!'
                })
            })
    },

    getStudentClassbook: (req, res) => {
        CLASSBOOK.findOne({ owner: req.params.id })
            .populate({
                path: 'courses',
                model: 'Course'
                // populate: {
                //   path: 'classbook',
                //   populate: {
                //       path: 'courses',
                //       model: 'Course'
                //   }
                // } 
            })
            .populate({
                path: 'owner',
                model: 'User'
            })
            .then((classbook) => {
                return res.status(200).json({
                    classbook: classbook
                });
            })
    },

    addGrades: (req, res) => {
        COURSE.findOne({ classbook: req.body.classbook, name: req.body.name })
            .then((course) => {
                course.grades.push(req.body.grade);
                course.save();
            })
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Grade added successfuly!'
                })
            })
    },

    getStudentDetails: (req, res) => {
        USER.findOne({ _id: req.params.id })
            .populate()
            .then((user) => {
                return res.status(200).json({
                    student: user
                })
            })
    }
}