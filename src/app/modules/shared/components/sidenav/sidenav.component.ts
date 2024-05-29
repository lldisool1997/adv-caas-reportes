import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('expandPanel', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('250ms ease-in-out')),
    ])],
})
export class SidenavComponent {

  modileQuery : MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Asiento RV", icon: "assured_workload", children: [
      {
        name: "Asiento RV Contado", route: 'asiento-rv-contado', icon: "monetization_on"
      },
      {
        name: "Asiento RV Credito", route: 'asiento-rv-credito', icon: "payment"
      }
    ]

    },
    {name: "Asientos RC", route: "asiento-rc", icon: "account_balance"}
  ]

  constructor(media : MediaMatcher){
    this.modileQuery = media.matchMedia('(max-width : 600px)');

  }
  
}
