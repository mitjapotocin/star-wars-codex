import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CharacterI } from 'src/app/types/people-type';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50%)' }),
            stagger(40, [
              animate('0.4s ease-out', style({ opacity: 1, transform: 'none'}))
            ])
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ opacity: 1 }),
            stagger(10, [
              animate('0.1s ease-in', style({ opacity: 0, transform: 'translateX(-25px)'}))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class CharacterListComponent {
  @Input() characters: CharacterI[] = [];
  @Input() loading: boolean = false;

  constructor(
    private _changeDetection: ChangeDetectorRef
  ) { }
}
