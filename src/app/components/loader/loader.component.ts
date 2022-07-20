import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() value: string = '';
}

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    MatProgressSpinnerModule
  ],
  providers: [],
  exports: [
    LoaderComponent
  ],
  bootstrap: []
})
export class LoaderModule { }

