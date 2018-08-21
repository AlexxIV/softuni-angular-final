import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';

@NgModule({
    declarations: [
    TeacherHomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        TeacherRoutingModule
    ]
})

export class TeacherModule {  }