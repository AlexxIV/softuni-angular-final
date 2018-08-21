import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';

const teacherRoutes : Route[] = [
    { path: '', component: TeacherHomeComponent }
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