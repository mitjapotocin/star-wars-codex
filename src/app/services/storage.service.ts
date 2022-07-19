import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getParsedItem(key: string): any {
    let value = localStorage.getItem(key);

    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  }

  setStringifiedItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export enum StorageKeys {
  favorites = 'favorites'
}