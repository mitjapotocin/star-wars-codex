import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(
    private _themeService: ThemeService
  ) { }
  
  ngOnInit() {
    let theme = this._themeService.setPreferredTheme();
    this.isDarkTheme = theme === 'dark';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this._themeService.toggleTheme();
  }
}
