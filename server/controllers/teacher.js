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
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            })
    },

    deleteStudent: (req, res) => {
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
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
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
                    message: 'Grade added successfully!'
                })
            })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            })
    },

    addCourse: (req, res) => {
        CLASSBOOK.findOne({ _id: req.body.classbook }).then((classbook) => {
            COURSE.create({
                classbook: classbook._id,
                name: req.body.courseName,
                grades: req.body.grades
            }).then((newCourse) => {
                classbook.courses.push(newCourse);
                classbook.save();
            }).then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Course created successfully!'
                })
            })
                .catch((err) => {
                    return res.status(409).json({
                        success: false,
                        message: err
                    });
                })
        })
    },

    deleteCourse: (req, res) => {
        COURSE.findOne({ classbook: req.body.classbook, name: req.body.name })
            .remove()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Course successfully deleted!'
                })
            }).catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
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
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            })
    },

    addNewStudent: (req, res) => {
        USER.findOne({ _id: req.body.student._id })
            .then((user) => {
                CLASSBOOK.create({
                    owner: user._id
                })
                    .then((classbook) => {
                        user.classbook = classbook._id
                        user.teacher = req.body.teacher
                        user.save();
                        USER.findOne({ _id: req.body.teacher })
                        .then((teacher) => {
                            teacher.teacher_class.push(user);
                            teacher.save();
                        })
                    })
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Student registered successfully and new classbook created!'
                        })
                    }).catch((err) => {
                        return res.status(409).json({
                            success: false,
                            message: err
                        })
                    })
            }).catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                })
            })

    },

    getCurrentClassSchedule: (req, res) => {
        USER.findOne({ _id: req.params.id }).then((teacher) => {
            USER.findOne({ teacher: teacher._id }).then((student) => {
                SCHEDULE.findOne({ student_class: student.student_class })
                    .then((schedule) => {
                        return res.status(200).json({
                            schedule: schedule
                        })
                    })
                    .catch((err) => {
                        return res.status(409).json({
                            success: false,
                            message: err
                        });
                    })
            })
        })
    },

    editSchedule: (req, res) => {
        USER.findOne({ _id: req.body.id }).then((teacher) => {
            USER.findOne({ teacher: teacher._id }).then((student) => {
                SCHEDULE.findOne({ student_class: student.student_class })
                    .then((schedule) => {
                        schedule[req.body.day] = req.body.values
                        schedule.save();
                    })
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Schedule updated successfully!'
                        })
                    })
                    .catch((err) => {
                        return res.status(409).json({
                            success: false,
                            message: err
                        });
                    })
            })
        })
    },

    getStudentsWithoutTeacher: (req, res) => {
        USER.find({ teacher: null, isAdmin: false, isTeacher: false }).then((students) => {
            return res.status(200).json({
                students: students
            })
        })
            .catch((err) => {
                return res.status(409).json({
                    success: false,
                    message: err
                });
            })
    }
}