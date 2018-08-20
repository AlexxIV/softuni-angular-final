import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  schedule;
  constructor(
    private studentService: StudentService
  ) { }

  

  ngOnInit() {
    this.studentService
      .getWeeklySchedule()
      .subscribe((response) => {
        this.schedule = response['weeklySchedule'];
      })
  }
}