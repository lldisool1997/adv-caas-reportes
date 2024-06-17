import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRouter { }