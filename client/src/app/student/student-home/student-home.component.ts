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
    this.studentModel = new Student("", "", "", "", "", "", 0, {}, "", "")
  }

  ngOnInit() {
    this.studentService
      .getPersonalInfo()
      .subscribe((response) => {
        this.studentModel.firstname = response['user']['firstname'];
        this.studentModel.lastname = response['user']['lastname'];
        this.studentModel.email = response['user']['email'];
        this.studentModel.student_class = response['user']['student_class'];
        this.studentModel.teacher = response['user']['teacher'];
        this.studentModel.personal_id = response['user']['personal_id'];
        this.studentModel.school_name = response['user']['school_name'];
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
