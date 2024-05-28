import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AsientoRcComponent } from '../asiento-rc/components/asiento-rc/asiento-rc.component';



const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'asiento-rc', component: AsientoRcComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChilModule { }
