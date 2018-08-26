const MONGOOSE = require('mongoose');

const ENCRYPTION = require('../_helpers/encryption');
const STRING = MONGOOSE.Schema.Types.String;
const NUMBER = MONGOOSE.Schema.Types.Number;
const BOOLEAN = MONGOOSE.Schema.Types.Boolean;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const USER_SCHEMA = MONGOOSE.Schema({
    firstname: { type: STRING, required: true },
    lastname: { type: STRING, required: true },
    email: { type: STRING, required: true, unique: true },
    password: { type: STRING, required: true },
    salt: { type: STRING, required: true },
    isAdmin: { type: BOOLEAN, default: false },
    isTeacher: { type: BOOLEAN, default: false },
    roles: [{ type: OBJECT_ID, ref: 'Role' }],
    classbook: { type: OBJECT_ID, ref: 'ClassBook' },
    schedule: { type: OBJECT_ID, ref: 'Schedule' },
    teacher: { type: OBJECT_ID, ref: 'User'},
    teacher_class_ref: { type: NUMBER },
    teacher_class: [{ type: OBJECT_ID, ref: 'User' }],
    student_class: { type: NUMBER },
    createdDate: { type: Date, default: Date.now },
    personal_id: { type: STRING, required: true },
    school_name: { type: STRING, required: true }
});

USER_SCHEMA.method({
    authenticate: function (password) {
        let hashedPassword = ENCRYPTION.generateHashedPassword(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }

        return false;
    }
});

const USER = MONGOOSE.model('User', USER_SCHEMA);

module.exports = USER;