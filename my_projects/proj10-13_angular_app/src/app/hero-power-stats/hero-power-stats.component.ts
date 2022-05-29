import { Hero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-hero-power-stats',
  templateUrl: './hero-power-stats.component.html',
  styleUrls: ['./hero-power-stats.component.css']
})
export class HeroPowerStatsComponent implements OnInit {
  @Input() hero?: Hero;
  constructor() { }

  ngOnInit(): void {
  }

}
