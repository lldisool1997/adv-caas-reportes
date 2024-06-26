import { DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Query, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CabeceraMigracionItem, MigracionesItemCGH } from 'src/app/models/migraciones/migraciones';
import { MigracionService } from 'src/app/servicios/migraciones/migracion.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-consultar-data',
  templateUrl: './consultar-data.component.html',
  styleUrls: ['./consultar-data.component.scss']
})
export class ConsultarDataComponent implements OnInit{

  


  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fecha_registro : string = "";
  cantidad_regisros : string = "";

  statusLoading : boolean = false;
  dataCargada : boolean = false;

  dataSource! : MatTableDataSource<MigracionesItemCGH>;

  columns : string[] = [
    'MES',
    'PERSPECTIVA',
    'NOMBRE_SECTOR',
    'NOMBRE_OBJETIVO',
    'CODIGO',
    'NOMBRE_KPI',
    'META',
    'VALUE_EVAL',
    'CUMPLE',
    'MEASURE_2',
    'MEASURE_3',
    'MEASURE_4',
  ]
  
  constructor(
    private migracionesService : MigracionService,
    private toast: ToastrService
  ){

  }

  ngOnInit(): void {
    this.consultar();
  }
  
  consultar(): void{
    const idPlanificacion = parseInt(localStorage.getItem('stage')!);
    const idPeriodo = parseInt(localStorage.getItem('periodo')!);
    if(idPeriodo){
      this.statusLoading = true;
      this.dataCargada = false;
      this.migracionesService.getMigrationCAAS(idPlanificacion, idPeriodo).subscribe((rpta : any)=>{
        this.statusLoading = false;
        this.dataCargada = true;
        this.fecha_registro = rpta.data.createDate;
        this.cantidad_regisros = rpta.data.migracionItems.length;
        this.dataSource = new MatTableDataSource<MigracionesItemCGH>(
          rpta.data.migracionItems.map((data : any)=>{
            return {
              MES : data.mes,
              PERSPECTIVA : data.perspectiva,
              NOMBRE_SECTOR : data.sector,
              NOMBRE_OBJETIVO : data.objetivo!,
              CODIGO : data.codigo,
              NOMBRE_KPI : data.kpi,
              META : data.meta,
              VALUE_COOR : data.valorAlcanzado,
              CUMPLE : data.cumple,
              MEASURE_2 : data.analisisCoordinador,
              MEASURE_3 : data.analisisController,
              MEASURE_4 : data.analisisEvaluador
            }
          })
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        });
      }, (error : HttpErrorResponse)=>{
        this.statusLoading = false;
        this.dataCargada = true;
        if (error.status === 404) {
          this.toast.warning("No se encontró consúltela al AdvE usando el botón 'Traer data AdvE'");
        } else {
          this.toast.error(`Error ${error.status}: ${error.message}`);
        }
      })
    }
    else{
      this.toast.warning("Debe seleccionar un Periodo")
    }
  }

  getDataMigraciones(): void{
    const idPeriodo = String(localStorage.getItem('periodo'));
    if(idPeriodo && idPeriodo != 'null'){
      const filas : number = parseInt(prompt("(SOLO DESARROLLADORES) Ingrese la cantidad de filas")!)
      this.statusLoading = true;
      this.dataCargada = false;
      this.migracionesService.getDataMigracionesFila(idPeriodo, filas).subscribe(rpta=>{
        this.fecha_registro = this.getFechaActual();
        this.cantidad_regisros = rpta.length;
        this.statusLoading = false;
        this.dataCargada = true;
        this.dataSource = new MatTableDataSource<MigracionesItemCGH>(rpta);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
          this.saveDataMigraciones();
        });
      }, error=>{
        this.statusLoading = false;
        this.dataCargada = true;
        this.toast.error("Ocurrió un error")
      })
    }
    else{
      this.toast.warning("Debe seleccionar un Periodo")
    }
  }

  getMigracionCabecera(): CabeceraMigracionItem{
    return {
      idPlanificacion: parseInt(localStorage.getItem('stage')!),
      idPeriodo: parseInt(localStorage.getItem('periodo')!),
      userCreate: '',
      createDate: '',
      migracionItems: []
    }
  }


  saveDataMigraciones(): void{

    let migracion : CabeceraMigracionItem = this.getMigracionCabecera();

    migracion.migracionItems = this.dataSource.data.map(migracionCgh=>{
      return {
        mes: migracionCgh.MES,
        perspectiva: migracionCgh.PERSPECTIVA,
        sector: migracionCgh.NOMBRE_SECTOR,
        objetivo: migracionCgh.NOMBRE_OBJETIVO!,
        codigo: migracionCgh.CODIGO,
        kpi: migracionCgh.NOMBRE_KPI,
        meta: migracionCgh.META,
        valorAlcanzado: migracionCgh.VALUE_COOR,
        cumple: migracionCgh.CUMPLE,
        analisisCoordinador: migracionCgh.MEASURE_2,
        analisisController: migracionCgh.MEASURE_3,
        analisisEvaluador: migracionCgh.MEASURE_4
      }
    })
      this.migracionesService.saveMigration(migracion).subscribe(rpta=>{


      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getFechaActual() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'datos_exportados');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
