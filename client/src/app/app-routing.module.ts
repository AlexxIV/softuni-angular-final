import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './auth/admin.guard';
import { TeacherGuard } from './auth/teacher.guard';
import { AuthGuard } from './auth/auth.guard';
import { StudentGuard } from './auth/student.guard';
import { AnonGuard } from './auth/anon.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Route[] = [
    {
        path: 'user', children: [
            { path: 'login', component: LoginComponent,
        canActivate: [AnonGuard] },
            { path: 'register', component: RegisterComponent,
        canActivate: [AnonGuard] }
        ]
    },
    {
        path: 'admin', loadChildren: () => AdminModule,
        canActivate: [AdminGuard]
    },
    {
        path: 'teacher', loadChildren: () => TeacherModule,
        canActivate: [TeacherGuard]
    },
    {
        path: 'student', loadChildren: () => StudentModule,
        canActivate: [StudentGuard]
    },
    {
        path: '', pathMatch: 'full', component: HomepageComponent,
        canActivate: [AuthGuard]   
    },
    {
        path: '**', redirectTo: '/user/login'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }