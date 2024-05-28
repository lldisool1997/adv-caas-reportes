import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AsientoRcComponent } from '../asiento-rc/components/asiento-rc/asiento-rc.component';
import { AsientoRcModule } from '../asiento-rc/asiento-rc.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AsientoRcModule
  ]
})
export class DashboardModule { }
