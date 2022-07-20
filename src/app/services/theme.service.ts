import { Injectable } from '@angular/core';
import { UserPreferencesService } from './user-preferences.service';

export type ColorTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private _userPreferencesService: UserPreferencesService
  ) { }

  toggleTheme() { 
    let currentTheme = this.getTheme();
    let themeToSet: ColorTheme = (currentTheme === 'light') ? 'dark' : 'light';

    this._userPreferencesService.setTheme(themeToSet);
    this.setTheme(themeToSet);
  }
    
  getTheme(): ColorTheme {
    return document.documentElement.getAttribute('theme') as ColorTheme;
  }

  private setTheme(name: ColorTheme) {
    document.documentElement.setAttribute('theme', name);
  }

  setPreferredTheme(): ColorTheme {
    let preferredTheme = this._userPreferencesService.getTheme();
    this.setTheme(preferredTheme);

    return preferredTheme;
  }
}
