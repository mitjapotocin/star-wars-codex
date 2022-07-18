import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this._apiService.getCharacters()
      .pipe(
        tap((data) => console.log(data)),
      )
      .subscribe();
  }

}
