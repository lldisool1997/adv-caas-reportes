import { Component } from '@angular/core';
import { chartOptions } from './chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  configuracionChart = chartOptions
}
