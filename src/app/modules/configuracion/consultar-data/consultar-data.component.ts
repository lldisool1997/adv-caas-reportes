import { DataSource } from '@angular/cdk/collections';
import { Component, Query, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MigracionesItem } from 'src/app/models/migraciones/migraciones';
import { MigracionService } from 'src/app/servicios/migraciones/migracion.service';

@Component({
  selector: 'app-consultar-data',
  templateUrl: './consultar-data.component.html',
  styleUrls: ['./consultar-data.component.scss']
})
export class ConsultarDataComponent {


  @ViewChild('paginator') paginator! : MatPaginator;

  statusLoading : boolean = false;
  dataCargada : boolean = false;

  dataSource! : MatTableDataSource<MigracionesItem>;

  columns : string[] = [
    'MES',
    'PERSPECTIVA',
    'NOMBRE_SECTOR',
    'NOMBRE_OBJETIVO',
    'CODIGO',
    'NOMBRE_KPI',
    'META',
    'VALUE_COOR',
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

  getDataMigraciones(): void{
    const idPeriodo = String(localStorage.getItem('periodo'));
    if(idPeriodo){
      const filas : number = parseInt(prompt("(SOLO DESARROLLADORES) Ingrese la cantidad de filas")!)
      this.statusLoading = true;
      this.migracionesService.getDataMigracionesFila(idPeriodo, filas).subscribe(rpta=>{
        this.statusLoading = false;
        this.dataCargada = true;
        this.dataSource = new MatTableDataSource<MigracionesItem>(rpta);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      })
    }
    else{
      this.toast.warning("Debe seleccionar un Periodo")
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
