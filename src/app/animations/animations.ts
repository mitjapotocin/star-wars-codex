import { trigger, style, transition, animate, stagger, query, group, animateChild } from '@angular/animations';

export const Animations = {
  listAnimation: [trigger('listAnimation', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(50%)' }),
          stagger(40, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          stagger(12, [
            animate('0.08s ease-out', style({ opacity: 0, transform: 'translateX(-25px)' }))
          ])
        ],
        { optional: true }
      )
    ])
  ])],
  listAnimationEnter: [trigger('listAnimationEnter', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(50%)' }),
          stagger(40, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ],
        { optional: true }
      )
    ])
  ])],
  
}