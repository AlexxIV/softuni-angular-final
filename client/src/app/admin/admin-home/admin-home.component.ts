import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  admins: Object[]
  teachers: Object[]
  students: Object[]
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getAll()
      .subscribe((response) => {
        this.admins = response['admins'];
        this.teachers = response['teachers'];
        this.students = response['students'];
        console.log(this.admins);
        console.log(this.teachers);
        console.log(this.students);
      })
  }

  delete(id: string) {
    this.adminService
      .delete(id)
      .subscribe()
  }
}
