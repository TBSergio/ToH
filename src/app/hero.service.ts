import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

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
