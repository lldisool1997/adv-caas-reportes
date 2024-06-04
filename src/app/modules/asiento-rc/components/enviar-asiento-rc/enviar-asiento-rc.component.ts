import { Component, INJECTOR, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { requestAAsinet } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { ApiResponse, ApiResult, PlanCuentasRequest } from 'src/app/core/models/generico/http';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';
import { AsientoRcComponent } from '../asiento-rc/asiento-rc.component';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-enviar-asiento-rc',
  templateUrl: './enviar-asiento-rc.component.html',
  styleUrls: ['./enviar-asiento-rc.component.scss']
})
export class EnviarAsientoRCComponent {

  responseData: ApiResponse<ApiResult> | null;

  private sendAsientos = inject(SendAsientosService);
  private toast = inject(ToastrService)

  formulario: FormGroup;  
  cancelClicked: boolean = false;
  cancelButtonText: string = 'Cancel';
  enviarAAsinetLoading : boolean = false;
  enviarAAsinet : string = 'Enviar Asiento';
  textIconAAsient : string = 'forward_to_inbox';
  fechaTituloString: string = ''; // Declare fechaTituloString

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,

      private formAsi: FormBuilder,
      public dialogRef : MatDialogRef<AsientoRcComponent>,
      private datePipe: DatePipe
    
    ){
      this.formulario = this.formAsi.group({
        fecha: [{value : '', disabled: true}],
        periodo: [{value : '', disabled: true}],
        descripcion: [{value : '', disabled: true}],
      });
      this.setFormData(data);
      this.responseData = null; // Inicialización en el constructor      

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
        externalSystem : '17',
        postedPeriod : this.formulario.get('periodo')?.value,
        journalDate : this.formulario.get('fecha')?.value,
        description : this.formulario.get('descripcion')?.value,
        idAsiento : '',
        condicion : '3',
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

    sendAsientoRcAAsinet():void{
      this.sendAsientos.senAsientosGenerico(this.getPayload()).subscribe((data: ApiResponse<ApiResult>)=>{

        this.responseData = data;

        if(this.responseData.code == '0000'){
          this.toast.success(this.responseData.Messages);
          Swal.fire({           
            icon: "success",
            title: 'AAsinet - CAAS',
            text: this.responseData.Messages,
            showConfirmButton: false,
            timer: 2500
          });

          this.dialogRef.close();

        }else{
          Swal.fire({
            icon: "error",
            title: 'AAsinet - CAAS',
            text: this.responseData.Messages           
          });
          this.toast.error(this.responseData.Messages);
        }


      },error =>{        
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
