import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    baseUrl: string = 'http://localhost:8000/admin/';
    getAllUrl: string = 'all';

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http
            .get(`${this.baseUrl}${this.getAllUrl}`);
    }

    delete(id) {
        return this.http
            .delete(`${this.baseUrl}`+id);
    }
}