import { PlanetI } from './../../types/planet-type';
import { Component, OnInit } from '@angular/core';
import { tap, take, mergeMap, map, catchError } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { CharacterI, CharacterListI } from 'src/app/types/character-type';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FilmI } from 'src/app/types/film-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animations } from 'src/app/animations/animations';
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  animations: Animations.listAnimationEnter
})
export class DetailViewComponent implements OnInit {
  character?: CharacterI;
  dataToShow: string[] = [
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'birth_year',
    'gender'
  ];
  films: string = '';
  homeworld: string = '';
  loading: boolean = false;
  
  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCharacter();
  }

  private getCharacter() {
    this.loading = true;

    let state = this._location.getState() as CharacterI;

    of(this.stateHasDataToShow(state))
      .pipe(
        take(1),
        mergeMap((hasData: boolean) => hasData ? of(state) : this.fetchCharacter()),
        tap((character: CharacterI) => { this.character = character; }),
        mergeMap((character: CharacterI) => this.fetchFilmsAndHomeWorld(character)),
        tap(() => { this.loading = false; }),
        catchError(() => this.handleError())
      )
      .subscribe();
  }


  private handleError() {
    return of(undefined)
      .pipe(
        tap(() => {
          this.loading = false;
          this._snackBar
            .open('There has ben a disturbance in the Force.', 'Go home')
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => { 
              this._router.navigate(['/']);
             });
        }),
      );
  }

  private fetchCharacter() {
    return this._apiService.getCharacterList({ query: this.getNameFromRoute() })
      .pipe(
        map((data: CharacterListI) => data.results[0])
      );
  }

  fetchFilmsAndHomeWorld({ films, homeworld }: CharacterI): any {
    let homeworldObs = this._apiService.get({ url: homeworld }) as Observable<PlanetI>;
    let filmsObs = films.map((url: string) => this._apiService.get({ url }) as Observable<FilmI>);

    return forkJoin([homeworldObs, ...filmsObs])
      .pipe(
        tap(([_homeworld, ..._films]) => {
          this.homeworld = _homeworld.name;
          this.films = _films
            .map((film: FilmI) => film.title)
            .join(', ');
        })
      );
  }

  private stateHasDataToShow(state: object): boolean {
    return this.dataToShow.every((prop: string) => this.hasProp(prop, state));
  }

  private getNameFromRoute() {
    let routePath = this._route.snapshot.url[0].path;
    return routePath.split('-').join(' ');
  }

  hasProp(prop: string, object: object = (this.character as object)): boolean {
    return !!(object && typeof object === 'object')
      ? (object as any)[prop]
      : false;
  }

  getProp(prop: string): string {
    return (this.character as any)[prop];
  }
}
