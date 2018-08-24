import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent implements OnInit {
  teacherId: string;
  schedule: Object;
  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) { 
    this.teacherId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.teacherService
      .getSchedule(this.teacherId)
      .subscribe((response) => {
        this.schedule = response['schedule'];
      })
  }

  editSchedule(arrayValue, arrayName) {
    this.teacherService
      .editSchedule(arrayValue, arrayName)
      .subscribe()
  }


}
