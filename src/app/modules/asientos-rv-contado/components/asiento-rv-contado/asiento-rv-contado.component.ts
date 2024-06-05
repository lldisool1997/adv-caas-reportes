import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { dataAsientosRC } from 'src/app/core/models/asientos-rc/asiento-rc-request';

@Component({
  selector: 'app-asiento-rv-contado',
  templateUrl: './asiento-rv-contado.component.html',
  styleUrls: ['./asiento-rv-contado.component.scss']
})
export class AsientoRvContadoComponent implements OnInit {

  private fb = inject(FormBuilder);


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
    throw new Error('Method not implemented.');
  }

  

}
