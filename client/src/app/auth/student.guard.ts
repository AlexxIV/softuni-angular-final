import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }

  check(): boolean {
    if (this.authService._isAuthenticated() && this.authService._userRoleHelper() === 'Student') {
      return true;
    }
    // if (this.authService._userRoleHelper() === 'Teacher') {
    //   this.router.navigate(['/teacher']);
    //   return false
    // }
    // if (this.authService._userRoleHelper() === 'Admin') {
    //   this.router.navigate(['/admin']);
    //   return false
    // }

    this.router.navigate(['/']);
    return false;
  }
}
