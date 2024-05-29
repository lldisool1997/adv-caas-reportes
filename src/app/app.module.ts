import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AsientoRvContadoComponent } from './modules/asiento-rv-contado/asiento-rv-contado.component';
import { AsientoRvCreditoComponent } from './modules/asiento-rv-credito/asiento-rv-credito.component';

@NgModule({
  declarations: [
    AppComponent,
    AsientoRvContadoComponent,
    AsientoRvCreditoComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
