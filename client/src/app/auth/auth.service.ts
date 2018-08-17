import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from './models/user-register';
import { UserLogin } from './models/user-login';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: string;
    baseUrl: string = 'http://localhost:8000/user/';
    registerUrl: string = 'register';
    loginUrl: string = 'login';

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private http: HttpClient
    ) { }

    register(body: UserRegister) {
            return this.http
                .post(this.baseUrl+this.registerUrl, body)
         }

    login(body: UserLogin) {
            return this.http
                .post(this.baseUrl+this.loginUrl, body)
    }

    logout() {
        localStorage.clear();
    }

    getToken() : string {
        return localStorage.getItem('token');
    }

    isAuthenticated() : boolean {
        return this.getToken() !== null;
    }

}