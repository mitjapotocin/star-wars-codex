import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CharacterI } from 'src/app/types/character-type';
import { Animations } from 'src/app/animations/animations';

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

  constructor(
    private _changeDetection: ChangeDetectorRef
  ) { }
}
