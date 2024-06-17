import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRouter } from './usuarios.router';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRouter
  ]
})
export class UsuariosModule { }
