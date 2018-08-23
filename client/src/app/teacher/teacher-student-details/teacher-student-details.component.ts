import { Component, OnInit } from '@angular/core';
import { EditStudent } from '../models/edit-student';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-student-details',
  templateUrl: './teacher-student-details.component.html',
  styleUrls: ['./teacher-student-details.component.scss']
})
export class TeacherStudentDetailsComponent implements OnInit {
  student: EditStudent
  studentId: string
  constructor(
    private teacherService: TeacherService,
    private route : ActivatedRoute,
  ) {
     this.studentId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.teacherService
      .getStudent(this.studentId)
      .subscribe((response) => {
        this.student = response['student'];
        console.log(this.student);
      })
  }

}
