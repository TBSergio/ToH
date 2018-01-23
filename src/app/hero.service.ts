import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroSevice: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  constructor(public messageService: MessageService) { }

}
