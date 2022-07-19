import { take,tap, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService, GetCharacterListParams } from '../../services/api.service';
import { CharacterI, CharacterListI } from 'src/app/types/people-type';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';

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
  private inputChange$: Subject<string> = new Subject<string>();
  inputChangeSub?: Subscription;

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getCharacters().pipe(take(1)).subscribe();
    this.subscribeToInputChange();
  }

  ngOnDestroy() {
    this.inputChangeSub?.unsubscribe();
  }
  
  private subscribeToInputChange() {
    this.inputChangeSub = this.inputChange$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => { this.loading = true; }),
        switchMap((query: string) => this.getCharacters({ query })),
        tap(() => { this.paginator?.firstPage() })
      )
      .subscribe();
  }

  private getCharacters(params: GetCharacterListParams = {}) {
    this.loading = true;
    this.characters = [];

    return this._apiService.getCharacterList(params)
      .pipe(
        tap((data: CharacterListI) => {
          if (!params.url) {
            this.paginator?.firstPage();
          }
          
          this.loading = false;
          this.characters = data.results;
          this.totalCount = data.count;
          this.pages = { next: data.next, previous: data.previous };
        })
      )
  }

  onPageChange(event: PageEvent) {
    let next = !event.previousPageIndex || event.previousPageIndex < event.pageIndex;
    this.getCharacters({ url: next ? this.pages?.next : this.pages?.previous })
      .pipe(take(1)).subscribe();
  }
  
  onInputChange(query: string) {
    this.inputChange$.next(query.trim());
  } 
}
