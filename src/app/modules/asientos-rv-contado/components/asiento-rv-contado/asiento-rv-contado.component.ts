import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AsientoRequest, dataAsientos } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { AsientoRvContadoService } from 'src/app/modules/shared/services/asiento-rv-contado.service';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';
import { EnviarAsientoRvContadoComponent } from '../enviar-asiento-rv-contado/enviar-asiento-rv-contado.component';

@Component({
  selector: 'app-asiento-rv-contado',
  templateUrl: './asiento-rv-contado.component.html',
  styleUrls: ['./asiento-rv-contado.component.scss']
})
export class AsientoRvContadoComponent implements OnInit {

  @ViewChild('paginador') paginator!: MatPaginator;

  private fb = inject(FormBuilder);
  private asientoSendGenerico = inject(SendAsientosService);
  private toast = inject(ToastrService);
  private asientoRVContService = inject(AsientoRvContadoService);
  private datePipe = inject(DatePipe);
  public dialog = inject(MatDialog);

  displayColumns : String[] = ['accountCode','subAccountCode','fundcode','functionCode','restriccionCode','entityValue','sendMemo','descripcion'];
  dataSource! : MatTableDataSource<dataAsientos>;

  statusLoading: boolean = false;
  statusLoadingToken : boolean = false;
  genTokenButtonText: string = 'Token';
  textIconToken : string = 'vpn_key';
  ingresos! : string;
	diferencia! : string;
	totalDebito! : string;
	totalCredito! : string;
  hide: boolean = true;

  formulario = this.fb.group({
    fechaAsiento: [new Date()],
    token: [''],
  });

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

  sendPayloadAsientoRV(): AsientoRequest {
    return {
      fecha : String(this.datePipe.transform(this.formulario.get("fechaAsiento")?.value, 'ddMMyyyy'))
    }
  }

  buscarAsientoContado():void{

    this.statusLoading = true;
    this.asientoRVContService.getAsientosRVContado(this.sendPayloadAsientoRV()).subscribe(rpta =>{

      this.statusLoading = false;
      console.log(rpta);
      if(rpta.metadata[0].code == "00"){
        this.toast.success(rpta.metadata[0].message,'Asientos Ingresos Contado')
        const dataAssiRVContado : dataAsientos[] = [];

        let lisAssiRVContado = rpta.response['asientos'];
        lisAssiRVContado.forEach((el : dataAsientos) => {
          dataAssiRVContado.push(el);
        });

        setTimeout(()=>{

          this.ingresos = String(rpta.response.ingresos);
          this.diferencia = String(rpta.response.diferencia);
          this.totalDebito = String(rpta.response.totalDebito);
          this.totalCredito = String(rpta.response.totalCredito);         
          this.dataSource = new MatTableDataSource<dataAsientos>(dataAssiRVContado);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }    
         
        }, 0)    

      }else if(rpta.metadata[0].code == "01"){
        this.toast.warning('Por favor genere el asiento en el sistema externo, actualmente no hay registros', 'Asientos Ingresos Contado');
        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource<dataAsientos>([]);
        } else {
          this.dataSource.data = [];
        }       
        this.ingresos = String(rpta.response.ingresos);
        this.diferencia = String(rpta.response.diferencia);
        this.totalDebito = String(rpta.response.totalDebito);
        this.totalCredito = String(rpta.response.totalCredito);      
       
      }else{
        this.toast.error('Error al cargar los datos', 'Mensaje de Error');
      }
    },error =>{
      this.statusLoading = false;
      this.toast.error('Hubo problemas con el servidor',error.name)
      console.log(error);      
    });

  }

  openEnviarAasinetContado(){
    if(this.dataSource && this.dataSource.data.length > 0 ){
      const vfecha = this.datePipe.transform(this.formulario.get("fechaAsiento")?.value, 'ddMMyyyy');
      const periodo = vfecha?.slice(2);
      const dialogRef = this.dialog.open(EnviarAsientoRvContadoComponent, {
      width: '650px',
      data: {fecha: vfecha, periodo: periodo,externalSystem:'17', condicion:'1', descripcion:'INGRESOS VENTAS CONTADO ' +this.datePipe.transform(this.formulario.get("fechaAsiento")?.value, 'dd.MM.yyyy') },
      disableClose: true
    }); 
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
       console.log("debemos vaciar la tabla");
       this.dataSource.data = [];
       this.ingresos = String('S/. 0.00');
       this.diferencia = String('0.00');
       this.totalDebito = String('S/. 0.00');
       this.totalCredito = String('S/. 0.00');
       this.formulario.get('fechaAsiento')?.setValue(new Date());
      }
    });

    }else{     
      this.toast.warning('Por favor visualice el asiento y verifique antes de enviar', 'Mensaje de Advertencia');

    }
      
    
  }

  

}
