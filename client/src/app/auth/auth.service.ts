import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from './models/user-register';
import { UserLogin } from './models/user-login';
import { Student } from '../student/models/student';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    baseUrl: string = 'http://localhost:8000/user/';
    registerUrl: string = 'register';
    loginUrl: string = 'login';
    changePassUrl: string = 'changepass';

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private http: HttpClient
    ) { }

    register(body: UserRegister) {
        return this.http
            .post(this.baseUrl + this.registerUrl, body)
    }

    login(body: UserLogin) {
        return this.http
            .post(this.baseUrl + this.loginUrl, body)
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    changePassword(body: Object) {
        return this.http
            .post(this.baseUrl + this.changePassUrl, body)
    }

    _isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    _userNameHelper(): string {
        return JSON.parse(localStorage.getItem('currentUser')).firstname;
    }

    _userLastNameHelper(): string {
        return JSON.parse(localStorage.getItem('currentUser')).lastname;
    }

    _userRoleHelper(): string {
        return JSON.parse(localStorage.getItem('currentUser')).userRole;
    }

    _userIdHelper(): string {
        return JSON.parse(localStorage.getItem('currentUser')).id;
    }

}