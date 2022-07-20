import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { UserPreferencesService } from '../../../services/user-preferences.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class UserPreferencesServiceStub { 
  getFavorites() { return []; }
  setFavorites() { }
}

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      providers: [
        { provide: UserPreferencesService, useClass: UserPreferencesServiceStub }
      ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('toggleFavorites should remove character if character is in favorites', () => {
    component.favorites = ['luke', 'obi'];

    component.toggleFavorite({ name: 'luke' } as any);
    expect(component.favorites).toEqual(['obi']);
  });

  it('toggleFavorites should add character if character is not in favorites', () => {
    component.favorites = ['luke', 'obi'];

    component.toggleFavorite({ name: 'sara' } as any);
    expect(component.favorites).toEqual(['luke', 'obi', 'sara']);
  });
});
