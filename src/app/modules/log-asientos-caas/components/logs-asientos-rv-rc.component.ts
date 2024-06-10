import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment'; // Importa moment aquí
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Element {
  numero: string;
  fechaRegistro : string,
  periodo : string,
  fechaAsiento : string,
  glosa : string,
  ingresos : string,
  totalDebito : string,
  totalCredito : string
  totalProveedor : number
}
const dataTEst: Element[] = [
  {
    numero: '1', fechaRegistro: '10-06-2024 09:56:32', periodo: '052024', 
    fechaAsiento: '01-05-2024',glosa:'ASIENTO DE COMPRAS RC 2024-05-01',
    ingresos:'0.00',totalDebito : '0.00',totalCredito: '0.00',totalProveedor : 1
  }, 
  // Más datos de ejemplo
];


@Component({
  selector: 'app-logs-asientos-rv-rc',
  templateUrl: './logs-asientos-rv-rc.component.html',
  styleUrls: ['./logs-asientos-rv-rc.component.scss'],
  providers: [    
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class LogsAsientosRvRcComponent {
  
  formRC!: FormGroup;
  formRVContado!: FormGroup;
  formRVCredito!: FormGroup;

  periodoRC: FormControl = new FormControl(moment()); // Definir el control de fecha
  periodoRVContado: FormControl = new FormControl(moment()); // Definir el control de fecha
  periodoRVCredito: FormControl = new FormControl(moment());

  constructor(private fb: FormBuilder) {

    this.formRC = this.initializeForm('periodoRC');
    this.formRVContado = this.initializeForm('periodoRVContado');
    this.formRVCredito = this.initializeForm('periodoRVCredito');
  }

  displayedColumns: string[] = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento','descripcion','ingresos','total_debito','total_credito','total_proveedor','acciones'];
  dataSource = new MatTableDataSource<Element>();

  initializeForm(dateControlName: string): FormGroup {
    const dateControl = new FormControl(moment());
    return this.fb.group({
        [dateControlName]: dateControl,
    });
} 

  setMonthAndYear(normalizedMonthAndYear: Moment, form: FormGroup, dateFormControlName: string, datepicker: MatDatepicker<Moment>) {

    const dateFormControl = form.get(dateFormControlName) as FormControl;
    const ctrlValue = dateFormControl.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    dateFormControl.setValue(ctrlValue);
    console.log("dateFormControl value:", dateFormControl.value);
    datepicker.close();
  }
  
}