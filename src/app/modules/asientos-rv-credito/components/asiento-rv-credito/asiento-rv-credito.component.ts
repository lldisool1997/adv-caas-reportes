import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AsientoRequest, dataAsientos } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { EnviarAsientoRvContadoComponent } from 'src/app/modules/asientos-rv-contado/components/enviar-asiento-rv-contado/enviar-asiento-rv-contado.component';
import { AsientoRvCreditoService } from 'src/app/modules/shared/services/asiento-rv-credito.service';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';
import { EnviarAsientoRvCreditoComponent } from '../enviar-asiento-rv-credito/enviar-asiento-rv-credito/enviar-asiento-rv-credito.component';

@Component({
  selector: 'app-asiento-rv-credito',
  templateUrl: './asiento-rv-credito.component.html',
  styleUrls: ['./asiento-rv-credito.component.scss']
})
export class AsientoRvCreditoComponent implements OnInit {

  @ViewChild('paginador') paginator!: MatPaginator;

  private fb = inject(FormBuilder);
  private asientoSendGenerico = inject(SendAsientosService);
  private toast = inject(ToastrService);
  private asientoRVCreditoService = inject(AsientoRvCreditoService);
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

  formularioCredito = this.fb.group({
    fechaAsiento: [new Date()],
    token: [''],
  });

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.formularioCredito.get('token')?.setValue(localStorage.getItem('token'));
    }
    /*throw new Error('Method not implemented.');*/
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
        this.toast.success(response.metadata[0].message,'Asientos Ingresos Contado') 
        this.formularioCredito.get("token")?.setValue(String(response.response['token']));  
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

  sendPayloadAsientoRCCredito(): AsientoRequest {
    return {
      fecha : String(this.datePipe.transform(this.formularioCredito.get("fechaAsiento")?.value, 'ddMMyyyy'))
    }
  }

  buscarAsientoCredito():void{

    this.statusLoading = true;
    this.dataSource = new MatTableDataSource<dataAsientos>([]); 
    this.ingresos = String('S/. 0.00');
    this.diferencia = String('0.00');
    this.totalDebito = String('S/. 0.00');
    this.totalCredito = String('S/. 0.00'); 
    this.asientoRVCreditoService.getAsientosRVContado(this.sendPayloadAsientoRCCredito()).subscribe(rpta =>{

      this.statusLoading = false;
      console.log(rpta);
      if(rpta.metadata[0].code == "00"){
        this.toast.success(rpta.metadata[0].message,'Asientos Ingresos Contado')
        const dataAssiRVCredito : dataAsientos[] = [];

        let lisAssiRVCredito = rpta.response['asientos'];
        lisAssiRVCredito.forEach((el : dataAsientos) => {
          dataAssiRVCredito.push(el);
        });

        setTimeout(()=>{

          this.ingresos = String(rpta.response.ingresos);
          this.diferencia = String(rpta.response.diferencia);
          this.totalDebito = String(rpta.response.totalDebito);
          this.totalCredito = String(rpta.response.totalCredito);         
          this.dataSource = new MatTableDataSource<dataAsientos>(dataAssiRVCredito);
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

  openEnviarAasinetCredito(){
    if(this.dataSource && this.dataSource.data.length > 0 ){
      const vfecha = this.datePipe.transform(this.formularioCredito.get("fechaAsiento")?.value, 'ddMMyyyy');
      const periodo = vfecha?.slice(2);
      const dialogRef = this.dialog.open(EnviarAsientoRvCreditoComponent, {
      width: '650px',
      data: {fecha: vfecha, periodo: periodo,externalSystem:'17', condicion:'2', descripcion:'INGRESOS VENTAS CREDITO ' +this.datePipe.transform(this.formularioCredito.get("fechaAsiento")?.value, 'dd.MM.yyyy') },
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
       this.formularioCredito.get('fechaAsiento')?.setValue(new Date());
      }
    });

    }else{     
      this.toast.warning('Por favor visualice el asiento y verifique antes de enviar', 'Mensaje de Advertencia');

    }
      
    
  }


}
