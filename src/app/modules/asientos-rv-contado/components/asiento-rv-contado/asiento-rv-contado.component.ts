import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { dataAsientosRC } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';

@Component({
  selector: 'app-asiento-rv-contado',
  templateUrl: './asiento-rv-contado.component.html',
  styleUrls: ['./asiento-rv-contado.component.scss']
})
export class AsientoRvContadoComponent implements OnInit {

  private fb = inject(FormBuilder);
  private asientoSendGenerico = inject(SendAsientosService);
  private toast = inject(ToastrService);

  displayColumns : String[] = ['accountCode','subAccountCode','fundcode','functionCode','restriccionCode','entityValue','sendMemo','descripcion'];
  dataSource! : MatTableDataSource<dataAsientosRC>;

  statusLoading: boolean = false;
  statusLoadingToken : boolean = false;
  genTokenButtonText: string = 'Token';
  textIconToken : string = 'vpn_key';

  formulario = this.fb.group({
    fechaAsiento: [new Date()],
    token: [{value: '', disabled: true}],
  });

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.formulario.get('token')?.setValue(localStorage.getItem('token'));
    }
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

  listarAsientoContado():void{
    
  }

  

}
