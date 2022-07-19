import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Input() value: string = '';
  @Output() onChange = new EventEmitter<string>();

  onInputChange() {
    this.onChange.emit(this.value);
  }

  clearValue() {
    this.value = '';
    this.onInputChange();
  }
}
