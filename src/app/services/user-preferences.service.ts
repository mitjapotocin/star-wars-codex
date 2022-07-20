import { Injectable } from '@angular/core';
import { StorageKeys, StorageService } from './storage.service';
import { ColorTheme } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(
    private _storageService: StorageService
  ) { }

  getFavorites(): string[] {
    return this._storageService.getParsedItem(StorageKeys.favorites) || [];
  }

  setFavorites(favorites: string[]) {
    this._storageService.setStringifiedItem(StorageKeys.favorites, favorites);
  }

  getTheme(): ColorTheme {
    return this._storageService.getParsedItem(StorageKeys.colorTheme) || 'light';
  }

  setTheme(value: string) {
    this._storageService.setStringifiedItem(StorageKeys.colorTheme, value);
  }
}
