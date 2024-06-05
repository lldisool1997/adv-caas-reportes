import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AsientoRcComponent } from '../asiento-rc/components/asiento-rc/asiento-rc.component';
import { AsientoRvContadoComponent } from '../asientos-rv-contado/components/asiento-rv-contado/asiento-rv-contado.component';
import { AsientoRvCreditoComponent } from '../asientos-rv-credito/components/asiento-rv-credito/asiento-rv-credito.component';



const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'asiento-rc', component: AsientoRcComponent },
    { path: 'asiento-rv-contado', component: AsientoRvContadoComponent },
    { path: 'asiento-rv-credito', component: AsientoRvCreditoComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChilModule { }
