import { Hero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';
import { powerStats } from '../powerStats';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-overall-rating',
  templateUrl: './hero-overall-rating.component.html',
  styleUrls: ['./hero-overall-rating.component.css']
})
export class HeroOverallRatingComponent implements OnInit {
  //Setter and Getter update the hero evey time the input value is changed.
  @Input() set hero(value:Hero){this._hero=value
  console.log(value)
  this.powerStats=this.hero?.powerStats;
  console.log("Overall component",this.powerStats)
  this.overallRating=this.getOverallRating();
};
  private _hero?: Hero;

  get hero():Hero{
    return this._hero as Hero;
  }
  overallRating: number | undefined;
  powerStats: powerStats | undefined;
  constructor(private heroService: HeroService) { 
    
  
  }

  ngOnInit(): void {
 
  }
getOverallRating(){
  let rating=0;
  const statValues: number[]=Object.values(this.powerStats as powerStats);
  for(const item of statValues){
    rating+=item;
  }
return rating;
  }

}

