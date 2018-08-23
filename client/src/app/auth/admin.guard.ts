import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
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
    if (this.authService._isAuthenticated() && this.authService._userRoleHelper() === 'Admin') {
      return true;
    }
    // if (this.authService._userRoleHelper() === 'Student') {
    //   this.router.navigate(['/student']);
    //   return false
    // }
    // if (this.authService._userRoleHelper() === 'Teacher') {
    //   this.router.navigate(['/teacher']);
    //   return false
    // }
    this.router.navigate(['/']);
    return false;
  }
}
