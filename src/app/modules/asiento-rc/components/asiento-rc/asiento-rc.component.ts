import { DatePipe } from '@angular/common';
import { Component, ErrorHandler, OnInit, Query, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AsientoRequest, dataAsientos } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { AsientoRcService } from 'src/app/modules/shared/services/asiento-rc.service';
import { EnviarAsientoRCComponent } from '../enviar-asiento-rc/enviar-asiento-rc.component';
import { timeout } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';

@Component({
  selector: 'app-asiento-rc',
  templateUrl: './asiento-rc.component.html',
  styleUrls: ['./asiento-rc.component.scss'],
})
export class AsientoRcComponent implements OnInit {  

  /*paginador = Query("paginador");*/
  @ViewChild('paginador') paginator!: MatPaginator;

  cantidad! : number;
  total! : string;
  genTokenButtonText: string = 'Token';
  textIconToken : string = 'vpn_key';

  formulario = this.fb.group({
    fecha: [new Date()],
    token: [''],
  });

  displayColumns : String[] = ['accountCode','subAccountCode','fundcode','functionCode','restriccionCode','entityValue','sendMemo','descripcion'];
  dataSource! : MatTableDataSource<dataAsientos>;

  statusLoading: boolean = false;
  statusLoadingToken : boolean = false;
  hide: boolean = true;

  constructor(
    private asientoRcService : AsientoRcService,
    private asientoSendGenerico : SendAsientosService, 
    private toast : ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialog : MatDialog
  ){

  }

  ngOnInit(): void {  

    if(localStorage.getItem('token')){
      this.formulario.get('token')?.setValue(localStorage.getItem('token'));
    }

  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


  obtenerToken():void{
    this.statusLoadingToken = true;
    this.genTokenButtonText = 'Generando token';
    this.textIconToken = 'lock_reset';
    this.asientoSendGenerico.getToken().subscribe( response =>{

      this.statusLoadingToken = false;    

      if(response.metadata[0].code == "00"){

        this.genTokenButtonText = 'token';
        this.textIconToken = 'vpn_key';
        this.toast.success(response.metadata[0].message,'Asientos Compras Dia') 
        this.formulario.get("token")?.setValue(String(response.response['token']));  
        localStorage.setItem("token", String(response.response['token']));          

      }else{
        this.toast.error('Error al cargar los datos', 'Mensaje de Error');
      } 

    },error =>{
      this.genTokenButtonText = 'token';
      this.textIconToken = 'vpn_key';
      this.statusLoadingToken = false;
      this.toast.error('Hubo problemas con el servidor',error.name)         
    });
    
  }

  buscarAsientoDia():void{
    this.statusLoading = true; 
    this.dataSource = new MatTableDataSource<dataAsientos>([]); 
    this.cantidad = 0;
    this.total = '0.00';
    const vfecha = this.datePipe.transform(this.formulario.get("fecha")?.value, 'ddMMyyyy');    

    this.asientoRcService.getAsientoRC({fecha:String(vfecha)}).subscribe(response=>{
      this.statusLoading = false;
      console.log(response);
      if(response.metadata[0].code == "00"){
        this.toast.success(response.metadata[0].message,'Asientos Compras Dia')       
        const dataAssiRC : dataAsientos[] = [];

        let lisAssiRC = response.response['asientos'];
        lisAssiRC.forEach((el : dataAsientos) => {
          dataAssiRC.push(el);
        });

        setTimeout(()=>{
          this.cantidad = Number(response.response.cantProveedor);
          this.total = String(response.response.total);
          this.dataSource = new MatTableDataSource<dataAsientos>(dataAssiRC);        
          this.dataSource.paginator = this.paginator;
        }, 0)        

      }else if(response.metadata[0].code == "01"){

        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<dataAsientos>([]);
        } else {
          this.dataSource.data = [];
        }      
        this.cantidad = 0;
        this.total = '0.00';
        this.toast.warning('Por favor genere el asiento en el sistema externo, actualmente no hay registros', 'Asientos Compras Dia');
      }else{
        this.toast.error('Error al cargar los datos', 'Mensaje de Error');
      }
    },error =>{
      this.statusLoading = false;
      this.toast.error('Hubo problemas con el servidor',error.name)
      console.log(error);      
    });

  }

  openEnviarAasinet(){
    if(this.dataSource && this.dataSource.data.length > 0 ){
      const vfecha = this.datePipe.transform(this.formulario.get("fecha")?.value, 'ddMMyyyy');
      const periodo = vfecha?.slice(2);
      const dialogRef = this.dialog.open(EnviarAsientoRCComponent, {
      width: '650px',
      data: {fecha: vfecha, periodo: periodo,externalSystem:'9', condicion:'3', descripcion:'DCC - PROVISION CAAS ' +this.datePipe.transform(this.formulario.get("fecha")?.value, 'dd.MM.yyyy') },
      disableClose: true
    }); 

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
       console.log("debemos vaciar la tabla");
       this.dataSource.data = [];
       this.cantidad = 0;
       this.total = '0.00';
       this.formulario.get('fecha')?.setValue(new Date());
      }
    });

    }else{     
      this.toast.warning('Por favor visualice el asiento y verifique antes de enviar', 'Mensaje de Advertencia');

    }
      
    
  }
}
