import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserLogin } from '../models/user-login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userModel: UserLogin;

  constructor(
    private authService: AuthService
  ) {
    this.userModel = new UserLogin("", "")
  }

  login() {
    this.authService.login(
      this.userModel)
      .subscribe(
        err => {
          this.userModel['password'] = '';
          this.userModel['email'] = '';
        }
      )
  }

}
