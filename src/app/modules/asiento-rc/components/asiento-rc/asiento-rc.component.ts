import { DatePipe } from '@angular/common';
import { Component, OnInit, Query, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AsientoRcRequest, dataAsientosRC } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { AsientoRcService } from 'src/app/modules/shared/services/asiento-rc.service';
import { EnviarAsientoRCComponent } from '../enviar-asiento-rc/enviar-asiento-rc.component';

@Component({
  selector: 'app-asiento-rc',
  templateUrl: './asiento-rc.component.html',
  styleUrls: ['./asiento-rc.component.scss']
})
export class AsientoRcComponent implements OnInit {  

  /*paginador = Query("paginador");*/
  @ViewChild('paginador') paginator!: MatPaginator;
  

  formulario = this.fb.group({
    fecha: [new Date()],
    token: [{value: '', disabled: true}],
  });

  displayColumns : String[] = ['accountCode','subAccountCode','fundcode','functionCode','restriccionCode','entityValue','sendMemo','descripcion'];
  dataSource! : MatTableDataSource<dataAsientosRC>;

  statusLoading: boolean = false;

  statusLoadingToken : boolean = false;

  constructor(
    private asientoRcService : AsientoRcService, 
    private toast : ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialog : MatDialog
  ){

  }

  ngOnInit(): void {    
  }

  obtenerToken():void{
    this.statusLoadingToken = true;
    this.asientoRcService.getToken().subscribe( response =>{

      this.statusLoadingToken = false;

      if(response.metadata[0].code == "00"){
        this.toast.success(response.metadata[0].message,'Asientos Compras Dia') 
        this.formulario.get("token")?.setValue(String(response.response['token']));  
        localStorage.setItem("token", "genToken");          

      }else{

        this.toast.error('Error al cargar los datos', 'Mensaje de Error');

      }     

    })
    
  }

  buscarAsientoDia():void{
    this.statusLoading = true;
    const vfecha = this.datePipe.transform(this.formulario.get("fecha")?.value, 'ddMMyyyy');

    this.asientoRcService.getAsientoRC({fecha:String(vfecha)}).subscribe(response=>{
      this.statusLoading = false;
      console.log(response);
      if(response.metadata[0].code == "00"){
        this.toast.success(response.metadata[0].message,'Asientos Compras Dia')       
        const dataAssiRC : dataAsientosRC[] = [];

        let lisAssiRC = response.response['asientos'];
        lisAssiRC.forEach((el : dataAsientosRC) => {
          dataAssiRC.push(el);
        })
        this.dataSource = new MatTableDataSource<dataAsientosRC>(dataAssiRC);        
        this.dataSource.paginator = this.paginator;

      }else{

        this.toast.error('Error al cargar los datos', 'Mensaje de Error');

      }
    })

  }

  openEnviarAasinet(){
    const vfecha = this.datePipe.transform(this.formulario.get("fecha")?.value, 'ddMMyyyy');
    const periodo = vfecha?.slice(2);
    const dialogRef = this.dialog.open(EnviarAsientoRCComponent, {
      width: '650px',
      data: {fecha: vfecha, periodo: periodo,externalSystem:'9', condicion:'3'},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
    
  }

}
