import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherClassbookComponent } from './teacher-classbook/teacher-classbook.component';
import { TeacherStudentDetailsComponent } from './teacher-student-details/teacher-student-details.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';

const teacherRoutes : Route[] = [
    { path: '', pathMatch: 'full', component: TeacherHomeComponent },
    { path: 'classbook/:id', component: TeacherClassbookComponent },
    { path: 'student/details/:id', component: TeacherStudentDetailsComponent },
    { path: 'schedule/:id', component: TeacherScheduleComponent },
    { path: 'info', component: TeacherInfoComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(teacherRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TeacherRoutingModule {  }