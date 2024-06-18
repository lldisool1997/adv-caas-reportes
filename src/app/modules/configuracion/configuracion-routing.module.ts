import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigracionesComponent } from './migraciones/migraciones.component';
import { ConsultarDataComponent } from './consultar-data/consultar-data.component';

const routes: Routes = [
    { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
    { path: 'migrar-data', component: MigracionesComponent},
    { path: 'consultar-data', component: ConsultarDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
