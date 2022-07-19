import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterListI } from '../types/character-type';

const API_URL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getCharacterList({ query, page }: GetCharacterListParams = {}): Observable<CharacterListI> {
    let url: URL = new URL(API_URL + '/people/');

    if (query) { url.searchParams.append('search', query); }
    if (page) { url.searchParams.append('page', page.toString()); }

    return this.get({url: url.href}) as Observable<CharacterListI>;
  }

  get({ url }: GetListParams): Observable<any> {
    return this._http.get(url, { responseType: 'json' });
  }
}

export interface GetCharacterListParams {
  page?: number;
  query?: string;
}
export interface GetListParams {
  url: string;
}

