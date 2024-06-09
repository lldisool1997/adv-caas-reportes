import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsAsientosRvRcComponent } from './components/logs-asientos-rv-rc.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LogsAsientosRvRcComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LogAsientosCaasModule { }
