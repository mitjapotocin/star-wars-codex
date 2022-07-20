import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent { 
  @Input() isDarkTheme: boolean = false;
  @Output() toggleTheme = new EventEmitter<void>()

  onToggle() {
    this.toggleTheme.emit();
  }
}
