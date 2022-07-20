import { Injectable } from '@angular/core';

const StorageKeyPrefix = 'sw-codex';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getParsedItem(key: StorageKeys): any {
    let _key = this.getKeyWithPrefix(key);
    let value = localStorage.getItem(_key);

    if (!value) {
      return undefined;
    }
    return JSON.parse(value);
  }

  setStringifiedItem(key: StorageKeys, value: any) {
    let _key = this.getKeyWithPrefix(key);
    localStorage.setItem(_key, JSON.stringify(value));
  }

  private getKeyWithPrefix(string: StorageKeys): string {
    return `${StorageKeyPrefix}_${string}`;
  }
}

export enum StorageKeys {
  favorites = 'favorites',
  colorTheme = 'color-theme'
}