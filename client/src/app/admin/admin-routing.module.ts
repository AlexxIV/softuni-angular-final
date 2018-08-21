import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const adminRoutes : Route[] = [
    { path: '', component: AdminHomeComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {  }