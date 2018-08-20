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
  student: Student;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentService
      .getPersonalInfo()
      .subscribe((response) => {
        this.student = response['user'];
      })
  }

}
