import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AsientoRcModule } from '../asiento-rc/asiento-rc.module';
import { AsientosRvContadoModule } from '../asientos-rv-contado/asientos-rv-contado.module';
import { AsientosRvCreditoModule } from '../asientos-rv-credito/asientos-rv-credito.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AsientoRcModule,
    AsientosRvContadoModule,
    AsientosRvCreditoModule
  ]
})
export class DashboardModule { }
