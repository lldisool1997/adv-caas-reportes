import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientoRvCreditoComponent } from './components/asiento-rv-credito/asiento-rv-credito.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnviarAsientoRvCreditoComponent } from './components/enviar-asiento-rv-credito/enviar-asiento-rv-credito/enviar-asiento-rv-credito.component';



@NgModule({
  declarations: [
    AsientoRvCreditoComponent,
    EnviarAsientoRvCreditoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AsientosRvCreditoModule { }
