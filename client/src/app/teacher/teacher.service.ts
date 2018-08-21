import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    baseUrl: string = 'http://localhost:8000/teacher/';
    public studentId;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }
}