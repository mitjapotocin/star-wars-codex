import { tap, distinctUntilChanged, switchMap, debounceTime, map, catchError, take } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService, GetCharacterListParams } from '../../services/api.service';
import { CharacterI, CharacterListI } from 'src/app/types/character-type';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge, of, Subject, Subscription, Observable, pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // View queries
  @ViewChild('paginator') paginator?: MatPaginator;

  // Variables
  title: string = 'Characters'
  characters: CharacterI[] = [];
  loading: boolean = false;
  totalCount?: number;
  private pages?: { next: string, previous: string };

  // Subjects
  private pageChange$: Subject<GetCharacterListParams> = new Subject<GetCharacterListParams>();
  private inputChange$: Subject<string> = new Subject<string>();
  private inputChangeSub?: Subscription;

  constructor(
    private _apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.subscribeToData();
  }

  ngOnDestroy() {
    this.inputChangeSub?.unsubscribe();
  }

  onPageChange(event: PageEvent) {
    let next = !event.previousPageIndex || event.previousPageIndex < event.pageIndex;
    this.pageChange$.next({ url: next ? this.pages?.next : this.pages?.previous })
  }

  onInputChange(query: string) {
    this.inputChange$.next(query.trim());
  }

  private subscribeToData() {
    this.inputChangeSub?.unsubscribe();
    this.inputChangeSub = merge(
      this.getInputChangeDebounced(),
      this.pageChange$,
      of({})
    )
      .pipe(
        tap((params: GetCharacterListParams) => { this.setStateBeforeFetch(params) }),
        switchMap((params: GetCharacterListParams) => this._apiService.getCharacterList(params)),
        tap((data: CharacterListI) => { this.setStateAfterFetch(data); }),
        catchError(() => this.handleError())
      )
      .subscribe();
  }

  private getInputChangeDebounced(): Observable<GetCharacterListParams> {
    return this.inputChange$.asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query: string) => ({ query } as GetCharacterListParams))
      );
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

  private setStateAfterFetch(data: CharacterListI) {
    this.loading = false;
    this.characters = data.results;
    this.totalCount = data.count;
    this.pages = { next: data.next, previous: data.previous };
  }

  private setStateBeforeFetch({ url }: GetCharacterListParams) {
    this.loading = true;
    this.characters = [];
    if (!url) {
      this.paginator?.firstPage();
    }
  }
}
