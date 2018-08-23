import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherClassbookComponent } from './teacher-classbook/teacher-classbook.component';
import { TeacherStudentDetailsComponent } from './teacher-student-details/teacher-student-details.component';

@NgModule({
    declarations: [
    TeacherHomeComponent,
    TeacherClassbookComponent,
    TeacherStudentDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        TeacherRoutingModule
    ]
})

export class TeacherModule {  }