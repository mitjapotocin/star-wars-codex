import { TestBed } from '@angular/core/testing';

import { StorageKeys, StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data to local storage', () => {
    let themeColor = 'dark';
    let key = service['getKeyWithPrefix'](StorageKeys.colorTheme);
    
    localStorage.clear();

    expect(localStorage.getItem(key)).toBe(null);    
    
    service.setStringifiedItem(StorageKeys.colorTheme, themeColor);
    
    expect(service.getParsedItem(StorageKeys.colorTheme)).toBe(themeColor);
    expect(JSON.parse(localStorage.getItem(key) || '')).toBe(themeColor);
  });
});
