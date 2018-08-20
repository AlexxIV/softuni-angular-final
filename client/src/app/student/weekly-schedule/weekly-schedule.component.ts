import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  schedule;
  day: string;
  constructor(
    private studentService: StudentService
  ) { }



  ngOnInit() {
    this.studentService
      .getWeeklySchedule()
      .subscribe((response) => {
        this.schedule = response['weeklySchedule'];
      })
    let data = new Date();
    switch (data.getDay()) {
      case 1:
        this.day = 'Monday';
        break;
      case 2:
        this.day = 'Tuesday';
        break;
      case 3:
        this.day = 'Wednesday';
        break;
      case 4:
        this.day = 'Thursday';
        break;
      case 5:
        this.day = 'Friday';
        break;
    }
  }
}