import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserRegister } from '../models/user-register';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userModel: UserRegister;

  constructor(
    private authService: AuthService
  ) {
    this.userModel = new UserRegister("", "", "", "", "")
   }

   register() {
     this.authService.register(
       this.userModel)
       .subscribe(
         err => {
          this.userModel['password'] = '';
          this.userModel['confirmedPassword'] = '';
         }
       )
   }
}
