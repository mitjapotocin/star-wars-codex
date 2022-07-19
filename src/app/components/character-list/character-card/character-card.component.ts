import { Component, Input, OnInit } from '@angular/core';
import { CharacterI } from 'src/app/types/people-type';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character?: CharacterI;

  onInit() {
    console.log(this.character)
  }
}
