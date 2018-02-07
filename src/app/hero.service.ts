import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // what the fuck does this do?!
  constructor(private http: HttpClient,public messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  log(message: string): void{
    this.messageService.add('HeroService: ' + message);
  }
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap( _ => this.log('fetched hero id = '+id)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
    
  }

  private handleError<T> (operation = 'operation',result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl,hero)
      .pipe(tap(_ => this.log(`updated hero id = ${hero.id}`),
    catchError(this.handleError<any>('updateHero'))));
  }
}
