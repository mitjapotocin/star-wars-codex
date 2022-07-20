import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HomeComponent } from './home.component';

class EmptyStub { }
class RouterStub {
  events = of(undefined);
  parseUrl = () => { return { queryParams: {} }; };
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ApiService, useClass: EmptyStub },
        { provide: MatSnackBar, useClass: EmptyStub },
        { provide: ChangeDetectorRef, useClass: EmptyStub },
        { provide: Router, useClass: RouterStub }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
