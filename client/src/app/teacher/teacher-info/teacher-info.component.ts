import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeacherInfo } from '../models/teacher-info';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {
  teacherModel: TeacherInfo
  constructor(
    private teacherService: TeacherService,
    private authService: AuthService
  ) { 
    this.teacherModel = new TeacherInfo('', '', '', '' , '', '', '', '', null)
  }

  ngOnInit() {
    this.teacherService
      .getTeacherHomeInfo()
      .subscribe((response) => {
        this.teacherModel.firstname = response['teacher']['firstname'];
        this.teacherModel.lastname = response['teacher']['lastname'];
        this.teacherModel.email = response['teacher']['email'];
        this.teacherModel.personal_id = response['teacher']['personal_id'];
        this.teacherModel.school_name = response['teacher']['school_name'];
        this.teacherModel.teacher_class_ref = response['teacher']['teacher_class_ref'];
      })
  }

  changeTeacherPassword() {
    this.authService.changePassword(
      this.teacherModel)
      .subscribe(
        err => {
          this.teacherModel['oldPassword'] = '';
          this.teacherModel['newPassword'] = '';
          this.teacherModel['confirmedPassword'] = '';
        }
      )
  }

}
