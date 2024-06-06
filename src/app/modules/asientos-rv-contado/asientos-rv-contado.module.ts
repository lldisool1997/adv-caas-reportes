import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientoRvContadoComponent } from './components/asiento-rv-contado/asiento-rv-contado.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnviarAsientoRvContadoComponent } from './components/enviar-asiento-rv-contado/enviar-asiento-rv-contado.component';



@NgModule({
  declarations: [
    AsientoRvContadoComponent,
    EnviarAsientoRvContadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AsientosRvContadoModule { }
