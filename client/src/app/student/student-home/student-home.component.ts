import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Student } from '../models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  studentModel: Student;
  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {
    this.studentModel = new Student("", "", "", "", "", "")
   }

  ngOnInit() {
    this.studentService
      .getPersonalInfo()
      .subscribe((response) => {
        this.studentModel.firstname = response['user']['firstname'];
        this.studentModel.lastname = response['user']['lastname'];
        this.studentModel.email = response['user']['email'];
      })
  }

  changePassword() {
    this.authService.changePassword(
      this.studentModel)
      .subscribe(
        err => {
         this.studentModel['oldPassword'] = '';
         this.studentModel['newPassword'] = '';
         this.studentModel['confirmedPassword'] = '';
        }
      )
  }

}
