import { Component, INJECTOR, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { requestAAsinet } from 'src/app/core/models/asientos-rc/asiento-rc-request';
import { ApiResponse, ApiResult, PlanCuentasRequest } from 'src/app/core/models/generico/http';
import { SendAsientosService } from 'src/app/modules/shared/services/send-asientos.service';

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

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,

      private formAsi: FormBuilder
    
    ){
      this.formulario = this.formAsi.group({
        fecha: [{value : '', disabled: true}],
        periodo: [{value : '', disabled: true}],
        descripcion: [''],
      });

      console.log(data);
      this.setFormData(data);
      this.responseData = null; // Inicialización en el constructor 

    }

    setFormData(data: any) {
      this.formulario.patchValue({
        fecha: data.fecha,
        periodo: data.periodo,
        descripcion: ''
      });
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
      this.sendAsientos.senPlanCuentas(this.getPayloadPlanCuentas()).subscribe((data: ApiResponse<ApiResult>)=>{

        this.responseData = data;
        
        if(this.responseData.code == '0000'){
          this.toast.success(this.responseData.Messages);

        }else{
          this.toast.error(this.responseData.Messages);
        }


      });

    }

    sendAsientoRcAAsinet():void{
      this.sendAsientos.senAsientosGenerico(this.getPayload()).subscribe((data: ApiResponse<ApiResult>)=>{

        this.responseData = data;

        if(this.responseData.code == '0000'){
          this.toast.success(this.responseData.Messages);

        }else{
          this.toast.error(this.responseData.Messages);
        }

      });
      

    }
}
