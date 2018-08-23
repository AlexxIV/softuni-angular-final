import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentClassbook } from '../models/student-classbook';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-classbook',
  templateUrl: './teacher-classbook.component.html',
  styleUrls: ['./teacher-classbook.component.scss']
})
export class TeacherClassbookComponent implements OnInit {
  public studentId: string;
  public studentClassbook: StudentClassbook;
  public newCourse: boolean = false;
  public courseName: string;
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {
    this.studentId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.teacherService
      .getClassbook(this.studentId)
      .subscribe((response) => {
        this.studentClassbook = response['classbook'];
      })
  }

  addGrade(course, grade) {
    this.teacherService
      .addGrades(course, grade, this.studentClassbook['_id'])
      .subscribe(() => {
        this.studentClassbook.courses.find(c => c['name'] === course)['grades'].push(grade);
      })
  }

  addCourse(course) {
    this.teacherService
      .addCourse(course, this.studentClassbook['_id'])
      .subscribe(() => {
        this.studentClassbook.courses.push({
          name: course,
          grades: [],
          classbook: this.studentClassbook['_id']
        })
      })
  }
  
  delete(course) {
    this.teacherService
      .deleteCourse(course)
      .subscribe()
  }
}
