import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsAsientosRvRcComponent } from './components/logs-asientos-rv-rc.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    LogsAsientosRvRcComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ]
})
export class LogAsientosCaasModule { }
