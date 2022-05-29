import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { powerStats } from './powerStats';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
 //selectedHeroInService : Hero | undefined = undefined
  constructor() { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

  calculateRating(powerStats: powerStats){
  return powerStats.combat+powerStats.intelligence+powerStats.speed+powerStats.strength;  
  }
  }


