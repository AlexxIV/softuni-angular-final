import {
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            })
        }

        return next.handle(request)
            .pipe(tap((res: HttpEvent<any>) => {
                if (res instanceof HttpResponse && res.body.token) {
                    this.SaveToken(res.body);
                    this.toastr.success(res.body.message, 'Success!');
                    if (res.body.userRole==='Admin') {
                        this.router.navigate(['/admin']); //TODO
                    } else if (res.body.userRole==='Teacher') {
                        this.router.navigate(['/teacher']);
                    } else {
                        this.router.navigate(['/student']);
                    }

                }
                
                if (res instanceof HttpResponse && res.body.success && res.url.endsWith('register')
                    || res instanceof HttpResponse && res.body.success && res.url.endsWith('changepass')) {
                    localStorage.removeItem('currentUser');
                    this.toastr.success(res.body.message, 'Success!');
                    this.router.navigate(['/login']);
                }

                if (res instanceof HttpResponse && res.body.success && !res.body.token) {
                    this.toastr.success(res.body.message, 'Success!');
                }
            }));
    }

    private SaveToken(data) {
        localStorage.setItem('currentUser', JSON.stringify({
            'firstname': data.firstname,
            'lastname': data.lastname,
            'userEmail': data.userEmail,
            'userRole': data.userRole,
            'token': data.token,
            'id': data.userId
        }));
    }
}