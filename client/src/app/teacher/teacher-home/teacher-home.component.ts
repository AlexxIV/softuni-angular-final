import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeacherHome } from '../models/teacher-home';
import { EditStudent } from '../models/edit-student';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {
  teacher: TeacherHome;
  newStudents: EditStudent[];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService
      .getTeacherHomeInfo()
      .subscribe((response) => {
        this.teacher = response['teacher'];
      })

    this.teacherService
      .getStudentsWithoutTeacher()
      .subscribe((response) => {
        this.newStudents = response['students'];
      })
  }

  delete(id: string) {
    this.teacherService
      .deleteStudent(id)
      .subscribe()
  }

  register(student) {
    this.teacherService
      .addStudent(student)
      .subscribe()
  }

}
