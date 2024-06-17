import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { MigracionesComponent } from './migraciones/migraciones.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    MigracionesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MaterialModule
  ]
})
export class ConfiguracionModule { }
