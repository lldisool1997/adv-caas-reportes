import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment'; // Importa moment aquí
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { LogAsientosCaasService } from '../../shared/services/log-asientos-caas.service';
import { logAsientosCAAS } from 'src/app/core/models/generico/http';
import { MatPaginator } from '@angular/material/paginator';
import { logAsientosCAASRequest } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { DatePipe } from '@angular/common';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../../shared/components/confirmacion/confirmacion.component';

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
export class LogsAsientosRvRcComponent implements AfterViewInit  {
  
  @ViewChild('paginador') paginator!: MatPaginator; 
  @ViewChild('matTabGroup') MatTabGroup!: MatTabGroup;
  formRC!: FormGroup;
  formRVContado!: FormGroup;
  formRVCredito!: FormGroup;
  private datePipe = inject(DatePipe);

  statusLoading: boolean = false;

  periodoRC: FormControl = new FormControl(moment()); // Definir el control de fecha
  periodoRVContado: FormControl = new FormControl(moment()); // Definir el control de fecha
  periodoRVCredito: FormControl = new FormControl(moment());

  public dialog = inject(MatDialog);

  tabCondicion : string = '3';
  periodoTab : string = '';
  externalSystem : string = '';
  journalTypeCode :string = '';
  constructor(
    private fb: FormBuilder,
    private logAsientos : LogAsientosCaasService,
    private cdr: ChangeDetectorRef, // Inyectar ChangeDetectorRef
    private toast :ToastrService,
  ) {

    this.initializeForms();    
  }

  ngAfterViewInit() {
    this.flagTabsUpdate();
  }
 

  displayedColumns: string[] = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento','descripcion','ingresos','total_debito','total_credito','total_proveedor','acciones'];
  dataSource = new MatTableDataSource<logAsientosCAAS>();

  initializeForms(): void {
    this.formRC = this.fb.group({
      periodoRC: this.periodoRC,
    });
    this.formRVContado = this.fb.group({
      periodoRVContado: this.periodoRVContado,
    });
    this.formRVCredito = this.fb.group({
      periodoRVCredito: this.periodoRVCredito,
    });
  }
  flagTabsUpdate() : void{
    const tabIndex = this.MatTabGroup.selectedIndex;   

      console.log("indice tab "+tabIndex)
      console.log(this.datePipe.transform(this.formRC.get('periodoRC')?.value,'MMyyyy'));

      switch (tabIndex) {
        case 0:
          this.tabCondicion = '3'; // Asientos RC
          this.periodoTab = String(this.datePipe.transform(this.formRC.get('periodoRC')?.value,'MMyyyy'));
          this.displayedColumns = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento', 'descripcion', 'ingresos', 'total_proveedor', 'acciones'];
          this.externalSystem = '9';
          this.journalTypeCode = 'RC';
          break;
        case 1:
          this.tabCondicion = '1'; // Asientos RV Contado
          this.periodoTab = String(this.datePipe.transform(this.formRVContado.get('periodoRVContado')?.value,'MMyyyy'));
          this.displayedColumns = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento', 'descripcion', 'ingresos', 'total_debito', 'total_credito','acciones'];
          this.externalSystem = '17';
          this.journalTypeCode = 'RV';
          break;
        case 2:
          this.tabCondicion = '2'; // Asientos RV Crédito
          this.periodoTab = String(this.datePipe.transform(this.formRVCredito.get('periodoRVCredito')?.value,'MMyyyy'));
          this.displayedColumns = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento', 'descripcion', 'ingresos', 'total_debito', 'total_credito','acciones'];
          this.externalSystem = '17';
          this.journalTypeCode = 'RV';
          break;
        default:
          this.tabCondicion = '3'; // Valor predeterminado
          this.periodoTab = String(this.datePipe.transform(this.formRC.get('periodoRC')?.value,'MMyyyy'))
          this.displayedColumns = ['numero', 'fecha_registro', 'periodo', 'fecha_asiento', 'descripcion', 'ingresos', 'total_proveedor', 'acciones'];
          this.externalSystem = '9';
          this.journalTypeCode = 'RC';
          break;
      }
      console.log("condicion asi "+this.tabCondicion);

       
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, form: FormGroup, dateFormControlName: string, datepicker: MatDatepicker<Moment>) {

    const dateFormControl = form.get(dateFormControlName) as FormControl | null;

    if (!dateFormControl || !dateFormControl.value || !moment.isMoment(dateFormControl.value)) {
      console.error("Variable "+dateFormControl+ " no es un FormControl válido o el valor no es un objeto Moment válido");
      return;
    }

    const ctrlValue = dateFormControl.value.clone(); // Clona el objeto Moment existente
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());

    dateFormControl.setValue(ctrlValue);
    console.log("dateFormControl value:", dateFormControl.value);

    this.cdr.detectChanges(); // Forzar la detección de cambios
    datepicker.close();
  } 

  sentPayloadLogs() : logAsientosCAASRequest{

    return {
      periodo :this.periodoTab,
      tipo : this.tabCondicion
    }

  }

  buscarLogAsientos() : void {
    this.flagTabsUpdate();
    this.statusLoading = true;
    this.dataSource = new MatTableDataSource<logAsientosCAAS>([]);
    this.logAsientos.getAsientosLogs(this.sentPayloadLogs()).subscribe(rpta =>{
      this.statusLoading = false;    
      console.log(rpta);
      if(rpta.metadata[0].code=='00'){
        this.toast.success(rpta.metadata[0].message,'Log Asientos Clinica Ana Stahl');
        const dataLogs : logAsientosCAAS[] = [];

        let dataService = rpta.response['logs'];
        dataService.forEach((el : logAsientosCAAS)=>{
          dataLogs.push(el);
        })

        setTimeout(()=>{            
          this.dataSource = new MatTableDataSource<logAsientosCAAS>(dataService);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }  
         
        }, 0)    

      }else if(rpta.metadata[0].code == "01"){
        this.toast.warning(rpta.metadata[0].message, 'Log Asientos Clinica Ana Stahl');
        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<logAsientosCAAS>([]);
        } else {
          this.dataSource.data = [];
        }      

      }else{
        this.toast.error('Error al cargar los datos', 'Mensaje de Error');
      }

    },error =>{
      this.statusLoading = false;
      this.toast.error('Hubo problemas con el servidor',error.name)
      console.log(error);      
    });

  }

  modalEliminarAsiento(dataAux: any){

    console.log(dataAux);
    const dateAsiento = dataAux.fechaAsiento.split('-');   
    let periodYear = dateAsiento[2];
    let periodMonth = dateAsiento[1];
    let journalCode = dateAsiento[0];   

    if(this.dataSource && this.dataSource.data.length > 0 ){
      const dialogRef = this.dialog.open(ConfirmacionComponent, {
        width: '650px',
        data: {id: dataAux.numero, anio: periodYear, mes : periodMonth, dia : journalCode, externalSystem: this.externalSystem, journalTypeCode : this.journalTypeCode },
        disableClose: true
      }); 

    }else{
      this.toast.warning('Por favor visualice el asiento y verifique antes de enviar', 'Mensaje de Advertencia');
    }

  }


  
}