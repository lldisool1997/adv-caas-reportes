import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-enviar-asiento-rc',
  templateUrl: './enviar-asiento-rc.component.html',
  styleUrls: ['./enviar-asiento-rc.component.scss']
})
export class EnviarAsientoRCComponent {

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

    }

    setFormData(data: any) {
      this.formulario.patchValue({
        fecha: data.fecha,
        periodo: data.periodo,
        descripcion: ''
      });
    }

    sendAsientoRcAAsinet():void{
      

    }
}
