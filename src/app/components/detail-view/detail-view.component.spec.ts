import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailViewComponent } from './detail-view.component';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { UserPreferencesService } from 'src/app/services/user-preferences.service';

class EmptyStub { }
class LocationStub { 
  getState() { return {}; }
}
class UserPreferencesServiceStub { 
  getFavorites() { return []; }
}

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailViewComponent],
      providers: [
        { provide: Location, useClass: LocationStub },
        { provide: ActivatedRoute, useClass: EmptyStub },
        { provide: Router, useClass: EmptyStub },
        { provide: ApiService, useClass: EmptyStub },
        { provide: MatSnackBar, useClass: EmptyStub },
        { provide: UserPreferencesService, useClass: UserPreferencesServiceStub },
        { provide: ChangeDetectorRef, useClass: EmptyStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
