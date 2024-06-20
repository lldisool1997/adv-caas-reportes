import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';



@NgModule({
  declarations: [
    ConfirmacionComponent
  ],
  exports:[
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    
  ]
})
export class SharedModule { }
