import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse, ApiResult, PlanCuentasRequest } from 'src/app/core/models/generico/http';
import { AsientoRvCreditoComponent } from '../../asiento-rv-credito/asiento-rv-credito.component';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';
import { ToastrService } from 'ngx-toastr';
import { requestAAsinet } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-enviar-asiento-rv-credito',
  templateUrl: './enviar-asiento-rv-credito.component.html',
  styleUrls: ['./enviar-asiento-rv-credito.component.scss']
})
export class EnviarAsientoRvCreditoComponent {

  formulario: FormGroup;  
  cancelClicked: boolean = false;
  cancelButtonText: string = 'Cancel';
  enviarAAsinetLoading : boolean = false;
  enviarAAsinet : string = 'Enviar Asiento';
  textIconAAsient : string = 'forward_to_inbox';
  fechaTituloString: string = ''; // Declare fechaTituloString
  responseData: ApiResponse<ApiResult> | null;

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,
    private formAsi: FormBuilder,
    public dialogRef : MatDialogRef<AsientoRvCreditoComponent>,
    private sendAsientos : SendAsientosService,
    private toast : ToastrService,
  ){

    this.formulario = this.formAsi.group({
      fecha: [{value : '', disabled: true}],
      periodo: [{value : '', disabled: true}],
      descripcion: [{value : '', disabled: true}],
    });   
    this.setFormData(data);
    this.responseData = null; // Inicialización en el constructor    
    console.log(data);

  }

  setFormData(data: any) {          
     
    this.formulario.patchValue({
      fecha: data.fecha,
      periodo: data.periodo,
      descripcion: data.descripcion
    });

    const day = data.fecha.substring(0, 2);
    const month = data.fecha.substring(2, 4);
    const year = data.fecha.substring(4, 8);

    // Construct the formatted date string
    this.fechaTituloString = `${day}.${month}.${year}`;
    
  }

  getPayload(): requestAAsinet{
    return {
      token : localStorage.getItem("token")!,
      externalSystem : this.data.externalSystem,
      postedPeriod : this.formulario.get('periodo')?.value,
      journalDate : this.formulario.get('fecha')?.value,
      description : this.formulario.get('descripcion')?.value,
      idAsiento : '',
      condicion : this.data.condicion
    }
  };

  getPayloadPlanCuentas(): PlanCuentasRequest{
    return {
      token : localStorage.getItem("token")!,
      accountingPeriod : this.formulario.get('periodo')?.value,
      acceptEntries : 'True'
    }
  };

  sendGetPlanCuentas():void{
    this.enviarAAsinetLoading = true;
    this.enviarAAsinet = 'Enviando asiento...';
    this.textIconAAsient = 'cloud_sync';

    this.sendAsientos.senPlanCuentas(this.getPayloadPlanCuentas()).subscribe((data: ApiResponse<ApiResult>)=>{

      this.responseData = data;

      this.enviarAAsinetLoading = false;
      
      if(this.responseData.code == '0000'){
        this.enviarAAsinet = 'Enviar Asiento';
        this.textIconAAsient = 'forward_to_inbox';
        this.toast.success(this.responseData.Messages);
        Swal.fire({           
          icon: "success",
          title: 'AAsinet - CAAS',
          text: this.responseData.Messages,
          showConfirmButton: false,
          timer: 2500
        });

        this.dialogRef.close(true);

      }else{
        this.enviarAAsinet = 'Enviar Asiento';
        this.textIconAAsient = 'forward_to_inbox';
        Swal.fire({
          icon: "error",
          title: 'AAsinet - CAAS',
          text: this.responseData.Messages           
        });
        this.toast.error(this.responseData.Messages);
      }


    },error =>{   
      this.enviarAAsinetLoading = false;        
      this.enviarAAsinet = 'Enviar Asiento';
      this.textIconAAsient = 'forward_to_inbox';
      this.toast.error('Hubo problemas con el servidor',error.name)
      console.log(error);      
    }); 

  }

  sendAsientoRVCreditoAAsinet():void{
    this.enviarAAsinetLoading = true;
    this.enviarAAsinet = 'Enviando asiento...';
    this.textIconAAsient = 'cloud_sync';
    this.sendAsientos.senAsientosGenerico(this.getPayload()).subscribe((data: ApiResponse<ApiResult>)=>{

      this.responseData = data;

      this.enviarAAsinetLoading = false;

      if(this.responseData.code == '0000'){
        this.enviarAAsinet = 'Enviar Asiento';
        this.textIconAAsient = 'forward_to_inbox';
        this.toast.success(this.responseData.Messages);
        Swal.fire({           
          icon: "success",
          title: 'AAsinet - CAAS',
          text: this.responseData.Messages,
          showConfirmButton: false,
          timer: 2500
        });

        this.dialogRef.close(true);

      }else{
        this.enviarAAsinet = 'Enviar Asiento';
        this.textIconAAsient = 'forward_to_inbox';
        Swal.fire({
          icon: "error",
          title: 'AAsinet - CAAS',
          text: this.responseData.Messages           
        });
        this.toast.error(this.responseData.Messages);
      }


    },error =>{        
      this.enviarAAsinetLoading = false;        
      this.enviarAAsinet = 'Enviar Asiento';
      this.textIconAAsient = 'forward_to_inbox';
      this.toast.error('Hubo problemas con el servidor',error.name)
      console.log(error);    
    });   

  }

  onCancelClick(): void {
    if (!this.cancelClicked) {
      this.cancelClicked = true;
      this.cancelButtonText = 'Confirmo salir del formulario';
    } else {
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
