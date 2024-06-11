import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendAsientosService } from '../../services/send-asientos.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  private AAsinetService = inject(SendAsientosService);
  private dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete() : void{

  }

}
