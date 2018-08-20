import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';



@NgModule({
    declarations: [
        AllCoursesComponent,
        StudentHomeComponent,
        WeeklyScheduleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        StudentRoutingModule
    ]
})

export class StudentModule {  }