import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { AuthService } from '../../auth/auth.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  courses: Course[]
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentService
      .getAllCourses()
      .subscribe((response) => {
        this.courses = response['courses'];
      })
  }
}
