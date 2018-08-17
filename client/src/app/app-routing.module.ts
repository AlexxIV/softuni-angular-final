import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { SigninComponent } from './auth/signin/signin.component';
// import { SignupComponent } from './auth/signup/signup.component';
// import { AuthGuard } from './auth/auth.guard';
// import { RecipeModule } from './recipe/recipe.module';

const routes: Route[] = [
    {
        path: 'user', children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
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