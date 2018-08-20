const MONGOOSE = require('mongoose');


const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;
const STRING = MONGOOSE.Schema.Types.String;
const NUMBER = MONGOOSE.Schema.Types.Number;


const COURSE_SCHEMA = MONGOOSE.Schema({
    classbook: { type: OBJECT_ID, ref: 'ClassBook'},
    name: { type: STRING, required: true, unique: true },
    grades: [{ type: NUMBER }]
    // teacher
});

const COURSE = MONGOOSE.model('Course', COURSE_SCHEMA);

module.exports = COURSE;
