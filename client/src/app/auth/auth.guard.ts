import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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
      this.router.navigate(['/student']);
      return false
    } else if (this.authService._isAuthenticated() && this.authService._userRoleHelper() === 'Teacher') {
      this.router.navigate(['/teacher']);
      return false
    } else if (this.authService._isAuthenticated() && this.authService._userRoleHelper() === 'Admin') {
      this.router.navigate(['/admin']);
      return false
    } else if (!this.authService._isAuthenticated()){
      this.router.navigate(['/user/login']);
      return false
    }
  }
}
