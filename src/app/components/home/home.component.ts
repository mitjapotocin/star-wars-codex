import { tap, distinctUntilChanged, switchMap, debounceTime, catchError, take, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService, GetCharacterListParams } from '../../services/api.service';
import { CharacterI, CharacterListI } from 'src/app/types/character-type';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge, of, Subject, Subscription, Observable, forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * View queries
   */
  @ViewChild('paginator') paginator?: MatPaginator;

  /**
   * Properties
   */
  title: string = 'Characters'
  characters: CharacterI[] = [];
  loading: boolean = false;
  totalCount?: number;
  inputValue: string = '';

  /**
   * Subjects and subscriptions
   */
  private inputChange$: Subject<string> = new Subject<string>();
  private inputChangeSub?: Subscription;
  private dataSub?: Subscription;

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router
  ) { }

  ngOnInit() {
    this.subscribeToData();
    this.subscribeToInputChanges()
  }

  ngOnDestroy() {
    this.inputChangeSub?.unsubscribe();
    this.dataSub?.unsubscribe();
  }

  onPageChange(event: PageEvent) {
    let params = { page: event.pageIndex + 1 };
    this.pushQueryParams(params);
  }

  onInputChange(query: string) {
    this.inputChange$.next(query.trim());
  }

  private subscribeToInputChanges() {
    this.inputChangeSub?.unsubscribe();
    this.inputChangeSub = this.inputChange$.asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((query: string) => { this.pushQueryParams({ query, page: 1 }) }),
      )
      .subscribe();
  }
  private pushQueryParams(params: { query?: string, page?: number }) {
    this._router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    })
  }

  private getStateFromQueryParams(): Observable<GetCharacterListParams> {
    let { query, page } = this._router.parseUrl(this._router.url).queryParams;
    this.inputValue = query || '';

    return of({ query, page });
  }

  private subscribeToData() {
    this.dataSub?.unsubscribe();
    this.dataSub = merge(
      this.routerEvents(),
      this.getStateFromQueryParams()
    )
      .pipe(
        tap(() => { this.setStateBeforeFetch() }),
        switchMap((params: GetCharacterListParams) => forkJoin([
          this._apiService.getCharacterList(params),
          of(params)
        ])),
        tap(([data, params]) => { this.setStateAfterFetch(data, params); }),
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
            .open('There has ben a disturbance in the Force.', 'Use the Force!')
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => { this.subscribeToData(); });
        }),
      );
  }

  private setStateAfterFetch(data: CharacterListI, { page }: GetCharacterListParams) {
    this.loading = false;
    this.characters = data.results;
    this.totalCount = data.count;
    if (page && this.paginator) {
      this.paginator.pageIndex = page - 1;
    }

    this._changeDetectorRef.detectChanges();
  }

  private setStateBeforeFetch() {
    this.loading = true;
    this.characters = [];
    this._changeDetectorRef.detectChanges();
  }

  protected routerEvents(): Observable<GetCharacterListParams> {
    return this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        switchMap(() => this.getStateFromQueryParams())
      )
  }
}
