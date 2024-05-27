import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  modileQuery : MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Asiento RV", route: "asiento-rv", icon: "category"},
    {name: "Asientos RC", route: "asiento-rc", icon: "production_quantity_limits"}
  ]

  constructor(media : MediaMatcher){
    this.modileQuery = media.matchMedia('(max-width : 600px)');

  }
  
}
