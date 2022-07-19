import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterListI } from '../types/people-type';

const API_URL = 'https://swapi.dev/api';

export interface GetCharacterListParams {
  url?: string;
  query?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getCharacterList({
    url = API_URL + '/people/',
    query
  }: GetCharacterListParams = {}): Observable<CharacterListI> {
    let _url: URL = new URL(url);

    if (query) {
      _url.searchParams.append('search', query);
    }

    return this._http.get(_url.href, { responseType: 'json' }) as Observable<CharacterListI>;
  }
}
