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
    classbookUrl: string = 'classbook/'
    addGradeUrl: string ='addGrade'

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    getTeacherHomeInfo() {
        return this.http
            .get(this.baseUrl+this.authService._userIdHelper());
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

    getStudent(id) {
        return this.http
            .get(`${this.baseUrl}${this.getStudentUrl}`+id);
    }

}