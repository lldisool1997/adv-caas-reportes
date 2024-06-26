import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { MigracionesComponent } from './migraciones/migraciones.component';
import { MaterialModule } from '../shared/material.module';
import { ConsultarDataComponent } from './consultar-data/consultar-data.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    MigracionesComponent,
    ConsultarDataComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MaterialModule,
    MatSortModule,
    MatTableModule
  ]
})
export class ConfiguracionModule { }
