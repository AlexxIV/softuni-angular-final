import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  public studentId;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.studentId = this.authService._userIdHelper();
  }

}
