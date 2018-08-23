import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeacherHome } from '../models/teacher-home';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  teacher: TeacherHome

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getTeacherHomeInfo()
      .subscribe((response) => {
        this.teacher = response['teacher'];
      })
  }

  delete(id: string) {
    this.teacherService
      .deleteStudent(id)
      .subscribe((response) => {
        console.log(response);
      })
  }

}
