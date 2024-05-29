import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientoRcComponent } from './components/asiento-rc/asiento-rc.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnviarAsientoRCComponent } from './components/enviar-asiento-rc/enviar-asiento-rc.component';



@NgModule({
  declarations: [
    AsientoRcComponent,
    EnviarAsientoRCComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AsientoRcModule { }
