const MONGOOSE = require('mongoose');

const USER = MONGOOSE.model('User');
const CLASSBOOK = MONGOOSE.model('ClassBook');
const COURSE = MONGOOSE.model('Course');
const SCHEDULE = MONGOOSE.model('Schedule');


const ENCRYPTION = require('../_helpers/encryption');
const STRING = MONGOOSE.Schema.Types.String;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const ROLE_SCHEMA = MONGOOSE.Schema({
    name: { type: STRING, required: true, unique: true },
    users: [{ type: OBJECT_ID, ref: 'User' }]
});

const ROLE = MONGOOSE.model('Role', ROLE_SCHEMA);

module.exports = ROLE;

module.exports.init = () => {
    // ROLE.findOne({ name: 'Admin' }).then((role) => {
    //     if (!role) {
    //         ROLE.create({ name: 'Admin' }).then((newRole) => {
    //             let salt = ENCRYPTION.generateSalt();
    //             let passwordHash = ENCRYPTION.generateHashedPassword(salt, 'admin');
    //             let adminUser = {
    //                 firstname: 'admin',
    //                 lastname: 'admin',
    //                 email: 'admin@admin.com',
    //                 salt: salt,
    //                 password: passwordHash,
    //                 isAdmin: true,
    //                 roles: [newRole._id]
    //             };

    //             USER.create(adminUser).then((user) => {
    //                 newRole.users.push(user._id);
    //                 newRole.save();
    //             });
    //         });
    //     }
    // });

    // ROLE.findOne({ name: 'Teacher' }).then((role) => {
    //     if (!role) {
    //         ROLE.create({ name: 'Teacher' }).then((newRole) => {
    //             let salt = ENCRYPTION.generateSalt();
    //             let passwordHash = ENCRYPTION.generateHashedPassword(salt, 'test');
    //             let newUser = {
    //                 firstname: 'Test',
    //                 lastname: 'Teacher',
    //                 email: 'test@teacher.com',
    //                 salt: salt,
    //                 password: passwordHash,
    //                 isTeacher: true,
    //                 roles: [newRole._id]
    //             };

    //             USER.create(newUser).then((nu) => {
    //                 newRole.users.push(nu._id);
    //                 newRole.save();
    //             });
    //         });
    //     }
    // });

    ROLE.findOne({ name: 'Student' }).then((role) => {
        if (!role) {
            ROLE.create({ name: 'Student' }).then((newRole) => {
                let salt = ENCRYPTION.generateSalt();
                let passwordHash = ENCRYPTION.generateHashedPassword(salt, 'test');
                let newUser = {
                    firstname: 'Test',
                    lastname: 'Student',
                    email: 'test@student.com',
                    salt: salt,
                    password: passwordHash,
                    roles: [newRole._id],
                    classbook: null
                };

                USER.create(newUser).then((nu) => {
                    newRole.users.push(nu._id);
                    newRole.save();
                    CLASSBOOK.create({ owner: nu._id }).then((newClassBook) => {
                        Promise.all([
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'Biology',
                                grades: [2, 5, 6, 3, 4]
                            }),
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'Math',
                                grades: [6, 6, 6]
                            }),
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'History',
                                grades: [2, 2, 2, 6]
                            }),
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'Physics',
                                grades: [2, 3, 6, 6, 6]
                            }),
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'Geography',
                                grades: [2, 5, 6, 3, 4]
                            }),
                            COURSE.create({
                                classbook: newClassBook._id,
                                name: 'P.E.',
                                grades: [6, 6, 6, 6, 6]
                            })
                        ]).then((courses) => {
                            newClassBook.courses = courses.map(c => c._id);
                            newClassBook.save()
                        })
                        SCHEDULE.create({
                            owner: nu._id,
                            Monday: ['Biology', 'Math', 'Math', 'P.E', 'History'],
                            Tuesday: ['Biology', 'Math', 'Math', 'P.E', 'History'],
                            Wednesday: ['Biology', 'Math', 'Math', 'P.E', 'History'],
                            Thursday: ['Biology', 'Math', 'Math', 'P.E', 'History'],
                            Friday: ['Biology', 'Math', 'Math', 'P.E', 'History']
                        }).then((schedule) => {
                            USER.findById(nu._id).then((userToUpdate) => {
                                userToUpdate.classbook = newClassBook._id;
                                userToUpdate.schedule = schedule._id;
                                userToUpdate.save()
                            })
                        })
                    })
                });
            });
        }
    });
};