import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://swapi.dev/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getCharacters(url: string = API_URL + '/people/') {
    return this._http.get(url, { responseType: 'json' }) as Observable<any[]>;
  }
}
