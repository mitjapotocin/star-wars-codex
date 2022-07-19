import { Injectable } from '@angular/core';
import { StorageKeys, StorageService } from './storage.service';

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
}
