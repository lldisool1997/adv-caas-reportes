import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Element {
  numero: number;
  asiento: string;
  fecha: string;
  descripcion: string;
}

const dataTEst: Element[] = [
  {numero: 1, asiento: 'A001', fecha: '2022-01-01', descripcion: 'Descripción 1'},
  {numero: 2, asiento: 'A002', fecha: '2022-01-02', descripcion: 'Descripción 2'},
  // Más datos de ejemplo
];

@Component({
  selector: 'app-logs-asientos-rv-rc',
  templateUrl: './logs-asientos-rv-rc.component.html',
  styleUrls: ['./logs-asientos-rv-rc.component.scss']
})
export class LogsAsientosRvRcComponent {  

  displayedColumns: string[] = ['numero', 'asiento', 'fecha', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<Element>();
  
}