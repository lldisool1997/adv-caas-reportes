import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientoRvCreditoComponent } from './components/asiento-rv-credito/asiento-rv-credito.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AsientoRvCreditoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AsientosRvCreditoModule { }
