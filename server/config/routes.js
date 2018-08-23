const USER_CONTROLLER = require('../controllers/user');
const STUDENT_CONTROLLER = require('../controllers/student');
const TEACHER_CONTROLLER = require('../controllers/teacher');
// const STAGE_CONTROLLER = require('../controllers/stage');
// const TEAM_CONTROLLER = require('../controllers/team');
// const RIDER_CONTROLLER = require('../controllers/rider');
// const FANTASY_TEAM_CONTROLLER = require('../controllers/fantasyTeam');
// const ERROR_CONTROLLER = require('../controllers/error');
const AUTH = require('../middleware/auth');

module.exports = (APP) => {
    APP.post('/user/register', USER_CONTROLLER.register);
    APP.post('/user/login', USER_CONTROLLER.login);
    APP.post('/user/changepass', USER_CONTROLLER.changePassword);

    APP.get('/student/courses/all/:id', STUDENT_CONTROLLER.getAllGrades);
    APP.get('/student/courses/schedule/:id', STUDENT_CONTROLLER.getSchedule);
    APP.get('/student/:id', STUDENT_CONTROLLER.getStudentInfo);

    APP.get('/teacher/:id', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.getTeacherInfo);
    APP.get('/teacher/classbook/:id', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.getStudentClassbook);
    APP.post('/teacher/classbook/addGrade', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.addGrades);
    APP.post('/teacher/classbook/addCourse', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.addCourse);
    APP.post('/teacher/classbook/deleteCourse', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.deleteCourse);
    APP.delete('/teacher/delete/student/:id', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.deleteStudent);
    APP.get('/teacher/details/student/:id', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.getStudentDetails);
    APP.get('/teacher/schedule/:id', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.getCurrentClassSchedule);
    APP.post('/teacher/schedule/edit', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.editSchedule);
    APP.get('/teacher/student/free', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.getStudentsWithoutTeacher);
    APP.post('/teacher/student/add', AUTH.isInRole('Teacher'), TEACHER_CONTROLLER.addNewStudent);


    
    
    // APP.get('/stage/all', STAGE_CONTROLLER.getAll);
    // APP.get('/stage/details/:id', STAGE_CONTROLLER.getSingle);
    // APP.post('/stage/add', AUTH.isInRole('Admin'), STAGE_CONTROLLER.add);
    // APP.put('/stage/edit/:id', AUTH.isInRole('Admin'), STAGE_CONTROLLER.edit);
    // APP.get('/stage/byNumber/:number', STAGE_CONTROLLER.getByNumber);
    // APP.get('/stage/byDate/:date', STAGE_CONTROLLER.getByDate);
    // APP.get('/stage/search', STAGE_CONTROLLER.search);

    // APP.get('/team/all', TEAM_CONTROLLER.getAll);
    // APP.get('/team/details/:id', TEAM_CONTROLLER.getSingle);
    // APP.post('/team/add', AUTH.isInRole('Admin'), TEAM_CONTROLLER.add);
    // APP.put('/team/edit/:id', AUTH.isInRole('Admin'), TEAM_CONTROLLER.edit);
    // APP.get('/team/byNumber/:number', TEAM_CONTROLLER.byNumber);

    // APP.get('/rider/all', RIDER_CONTROLLER.getAll);
    // APP.get('/rider/details/:id', RIDER_CONTROLLER.getSingle);
    // APP.post('/rider/add', AUTH.isInRole('Admin'), RIDER_CONTROLLER.add);
    // APP.put('/rider/edit/:id', AUTH.isInRole('Admin'), RIDER_CONTROLLER.edit);
    // APP.get('/rider/search', RIDER_CONTROLLER.search);

    // APP.get('/user/team', AUTH.isAuth, FANTASY_TEAM_CONTROLLER.getTeam);
    // APP.post('/user/team/add', AUTH.isAuth, FANTASY_TEAM_CONTROLLER.add);
    // APP.put('/user/team/edit', AUTH.isAuth, FANTASY_TEAM_CONTROLLER.edit);
    // APP.post('/transfers/lock', AUTH.isInRole('Admin'), FANTASY_TEAM_CONTROLLER.lockTransfers);
    // APP.post('/transfers/unlock', AUTH.isInRole('Admin'), FANTASY_TEAM_CONTROLLER.unlockTransfers);
    // APP.post('/result/submit', AUTH.isInRole('Admin'), FANTASY_TEAM_CONTROLLER.calcPoints);

    // APP.all('*', ERROR_CONTROLLER.error);
};