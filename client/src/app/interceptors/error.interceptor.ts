import {
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpEventType,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {


        return next.handle(req)
            .pipe(catchError((err: HttpErrorResponse) => {

                switch (err.status) {
                    case 409:
                        this.toastr.error(err.error.message, 'Warning!');
                        break;
                    case 401:
                        break;
                }

                return throwError(err);
            }));
    }
}