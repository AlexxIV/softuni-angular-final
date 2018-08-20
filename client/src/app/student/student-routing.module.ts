import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';

const studentRoutes : Route[] = [
    { path: '', component: StudentHomeComponent },
    { path: 'courses/all/:id', component: AllCoursesComponent },
    { path: 'courses/schedule/:id', component: WeeklyScheduleComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(studentRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class StudentRoutingModule {  }