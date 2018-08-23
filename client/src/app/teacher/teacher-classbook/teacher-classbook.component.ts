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
  public studentId: string
  public studentClassbook: StudentClassbook
  constructor(
    private route : ActivatedRoute,
    private teacherService: TeacherService
  ) { 
    this.studentId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.teacherService
      .getClassbook(this.studentId)
      .subscribe((response) => {
        this.studentClassbook = response['classbook'];
        console.log(this.studentClassbook);
      })
  }

  addGrade(course, grade) {
    this.teacherService
      .addGrades(course, grade, this.studentClassbook['_id'])
      .subscribe((response) => {
        this.studentClassbook.courses.find(c => c['name'] === course)['grades'].push(grade);
      })
  }
}
