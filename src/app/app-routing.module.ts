import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'configuracion', loadChildren: () => import('./modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing : false, useHash:true}
  ),
  DashboardRoutingModule

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
