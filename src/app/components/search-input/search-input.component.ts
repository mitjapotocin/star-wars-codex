import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
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
