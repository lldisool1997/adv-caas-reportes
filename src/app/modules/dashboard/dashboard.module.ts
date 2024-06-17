import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AsientoRcModule } from '../asiento-rc/asiento-rc.module';
import { AsientosRvContadoModule } from '../asientos-rv-contado/asientos-rv-contado.module';
import { AsientosRvCreditoModule } from '../asientos-rv-credito/asientos-rv-credito.module';
import { LogAsientosCaasModule } from '../log-asientos-caas/log-asientos-caas.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    AsientoRcModule,
    AsientosRvContadoModule,
    AsientosRvCreditoModule,
    LogAsientosCaasModule,
    CanvasJSAngularChartsModule
  ]
})
export class DashboardModule { }
