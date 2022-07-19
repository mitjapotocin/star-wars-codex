import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterI } from 'src/app/types/character-type';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  @Input() character?: CharacterI;
  @Input() isFavorite?: boolean;
  @Output() onFavoriteClicked = new EventEmitter<void>()

  characterNameDashCase(): string {
    if (!this.character?.name) {
      return ''
    }

    return this.character.name
      .split(' ')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join('-');
  }

  onFavoriteClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.onFavoriteClicked.emit();
  }
}
