import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

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
  imports: [CommonModule, RouterModule, SharedModule, MaterialModule],
  animations: [
    trigger('expandPanel', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('250ms ease-in-out')),
    ])],
})
export class SidenavComponent {

  modileQuery : MediaQueryList;

  menuNav : MenuNav[] = [
    {name: "Dashboard", route: "dashboard", icon: "home"},
    {name: "Configuracion", route: "configuracion", icon: "settings", children: [
      {
        name: "Usuarios", route: 'usuarios', icon: "person_pin"
      },
      {
        name: "Migrar Data", route: 'migrar-data', icon: "save_alt"
      }
    ]}
  ]

  constructor(media : MediaMatcher){
    this.modileQuery = media.matchMedia('(max-width : 600px)');

  }
  
}
