import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigracionesComponent } from './migraciones/migraciones.component';

const routes: Routes = [
    { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
    { path: 'migrar-data', component: MigracionesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
