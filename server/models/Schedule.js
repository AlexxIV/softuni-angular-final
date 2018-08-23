const MONGOOSE = require('mongoose');

const NUMBER = MONGOOSE.Schema.Types.Number;
const STRING = MONGOOSE.Schema.Types.String;


const SCHEDULE_SCHEMA = MONGOOSE.Schema({
    student_class: { type: NUMBER, required: true},
    Monday: [{ type: STRING }],
    Tuesday: [{ type: STRING }],
    Wednesday: [{ type: STRING }],
    Thursday: [{ type: STRING }],
    Friday: [{ type: STRING }]
});

const SCHEDULE = MONGOOSE.model('Schedule', SCHEDULE_SCHEMA);

module.exports = SCHEDULE;
