const MONGOOSE = require('mongoose');


const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;


const CLASS_BOOK_SCHEMA = MONGOOSE.Schema({
    owner: { type: OBJECT_ID, ref: 'User', unique: true, required: true},
    courses: [{ type: OBJECT_ID, ref: 'Course' }]
});

const CLASSBOOK = MONGOOSE.model('ClassBook', CLASS_BOOK_SCHEMA);

module.exports = CLASSBOOK;
