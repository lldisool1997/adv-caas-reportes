import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';
import { MigracionService } from 'src/app/servicios/migraciones/migracion.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';

interface MenuNav{
  name: string, 
  route: string, 
  icon: string, 
  children? : MenuNav[]
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [CommonModule, RouterModule, SharedModule, MaterialModule, ReactiveFormsModule],
  animations: [
    trigger('expandPanel', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('250ms ease-in-out')),
    ])],
})
export class SidenavComponent implements OnInit {

  periodos? : {ID: string, NAME: string}[];
  planificaciones? : {ID: string, NAME: string}[];
  modileQuery : MediaQueryList;


  menuNav : MenuNav[] = [
    {name: "Dashboard", route: "dashboard", icon: "home"},
    {name: "Configuracion", route: "configuracion", icon: "settings", children: [
      {
        name: "Usuarios", route: 'usuarios', icon: "person_pin"
      },
      {
        name: "Migrar Data", route: 'migrar-data', icon: "save_alt"
      },
      {
        name: "Ver Data Evaluaciones", route: 'consultar-data', icon: "search"
      }
    ]}
  ]

  form = this.fb.group({
    periodoSelect: [0],
    planificacionSelect: [0]
  });

  constructor(
    media : MediaMatcher,
    private migraciones :MigracionService,
    private fb: FormBuilder
  ){
    this.modileQuery = media.matchMedia('(max-width : 600px)');

  }

  ngOnInit(): void {
    this.migraciones.getPlanificaciones().subscribe(planificaciones=>{
      this.planificaciones = planificaciones;
      this.form.get('planificacionSelect')?.setValue(parseInt(String(localStorage.getItem('stage'))));
      if(localStorage.getItem('stage')){
        const idStage : number = parseInt(localStorage.getItem('stage')!);
        this.getPlanificaciones(idStage);
      }
    })
  }

  getPlanificaciones(value:number ){
    this.migraciones.getPeriodos(value).subscribe(data=>{
      this.periodos = data;
      this.form.get('periodoSelect')?.setValue(parseInt(String(localStorage.getItem('periodo')))); 
    })
  }

  setPeriodo(value : string): void{
    localStorage.setItem('periodo', value);
  }

  setPlanificacion(value : number): void{
    localStorage.setItem('stage', String(value));
    this.getPlanificaciones(value);
  }
  
}
