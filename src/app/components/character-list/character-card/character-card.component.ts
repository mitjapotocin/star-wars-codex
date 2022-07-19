import { Component, Input, OnInit } from '@angular/core';
import { CharacterI } from 'src/app/types/character-type';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character?: CharacterI;

  characterNameDashCase(): string {
    if (!this.character?.name) {
      return ''
    }

    return this.character.name
      .split(' ')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join('-');
  }
}
