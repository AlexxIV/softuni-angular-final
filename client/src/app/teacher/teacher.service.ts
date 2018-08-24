import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class TeacherService {
    baseUrl: string = 'http://localhost:8000/teacher/';
    deleteUrl: string ='delete/student/';
    getStudentUrl: string = 'details/student/';
    classbookUrl: string = 'classbook/';
    addGradeUrl: string ='addGrade';
    addCourseUrl: string = 'addCourse';
    deleteCourseUrl: string = 'deleteCourse';
    scheduleUrl: string = 'schedule/';
    newStudentsUrl: string ='student/free';
    addStudentUrl: string ='student/add';

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    getTeacherHomeInfo() {
        return this.http
            .get(`${this.baseUrl}`+this.authService._userIdHelper());
    }

    deleteStudent(id) {
        return this.http
            .delete(`${this.baseUrl}${this.deleteUrl}`+id);
    }

    getClassbook(id) {
        return this.http
            .get(`${this.baseUrl}${this.classbookUrl}`+id);
    }

    addGrades(name, grade, classbook) {
        return this.http
            .post(`${this.baseUrl}${this.classbookUrl}${this.addGradeUrl}`, {classbook, name, grade})
    }

    addCourse(courseName, classbook) {
        return this.http
            .post(`${this.baseUrl}${this.classbookUrl}${this.addCourseUrl}`, {classbook, courseName, grades: []})
    }

    deleteCourse(course) {
        return this.http
            .post(`${this.baseUrl}${this.classbookUrl}${this.deleteCourseUrl}`, course)
    }

    getStudent(id) {
        return this.http
            .get(`${this.baseUrl}${this.getStudentUrl}`+id);
    }

    addStudent(student) {
        return this.http
            .post(`${this.baseUrl}${this.addStudentUrl}`, {student, teacher: this.authService._userIdHelper()})
    }

    getSchedule(id) {
        return this.http
            .get(`${this.baseUrl}${this.scheduleUrl}`+id);
    }

    editSchedule(values, day) {
        return this.http
            .post(`${this.baseUrl}${this.scheduleUrl}edit`, {values, day, id: this.authService._userIdHelper()})
    }

    getStudentsWithoutTeacher() {
        return this.http
            .get(`${this.baseUrl}${this.newStudentsUrl}`);
    }

}