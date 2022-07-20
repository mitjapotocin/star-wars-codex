import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CharacterI } from 'src/app/types/character-type';
import { Animations } from 'src/app/animations/animations';
import { UserPreferencesService } from 'src/app/services/user-preferences.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: Animations.listAnimation
})
export class CharacterListComponent {
  @Input() characters: CharacterI[] = [];
  @Input() loading: boolean = false;

  favorites: any[] = [];

  constructor(
    private _userPreferencesService: UserPreferencesService
  ) { }

  ngOnInit() {
    this.favorites = this._userPreferencesService.getFavorites();
  }

  isFavorite({ name }: CharacterI): boolean {
    return this.favorites.includes(name);
  }

  toggleFavorite(character: CharacterI) {
    this.favorites = this.isFavorite(character)
      ? this.favorites.filter(c => c !== character.name)
      : [...this.favorites, character.name];

    this._userPreferencesService.setFavorites(this.favorites);
  }
}
