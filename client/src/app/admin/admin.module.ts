import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
    declarations: [
    AdminHomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ]
})

export class AdminModule {  }