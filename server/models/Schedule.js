const MONGOOSE = require('mongoose');

const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;
const STRING = MONGOOSE.Schema.Types.String;


const SCHEDULE_SCHEMA = MONGOOSE.Schema({
    owner: { type: OBJECT_ID, ref: 'User', unique: true, required: true},
    Monday: [{ type: STRING }],
    Tuesday: [{ type: STRING }],
    Wednesday: [{ type: STRING }],
    Thursday: [{ type: STRING }],
    Friday: [{ type: STRING }]
});

const SCHEDULE = MONGOOSE.model('Schedule', SCHEDULE_SCHEMA);

module.exports = SCHEDULE;
