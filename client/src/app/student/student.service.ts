import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Course } from './models/course';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    baseUrl: string = 'http://localhost:8000/student/';
    allCoursesUrl: string = 'courses/all/';
    weeklyScheduleUrl: string = 'courses/schedule/';
    public studentId;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    getAllCourses() {
        this.studentId = this.authService._userIdHelper();
        return this.http.get(`${this.baseUrl}${this.allCoursesUrl}${this.studentId}`)
    }

    getWeeklySchedule() {
        this.studentId = this.authService._userIdHelper();
        return this.http.get(`${this.baseUrl}${this.weeklyScheduleUrl}${this.studentId}`)
    }
}