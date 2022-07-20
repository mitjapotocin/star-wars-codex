import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DetailViewComponent } from './detail-view.component';
import { DetailComponent } from './detail/detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderModule } from '../loader/loader.component';

@NgModule({
  declarations: [
    DetailViewComponent,
    DetailComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    LoaderModule
  ],
  exports: [],
  providers: [],
})
export class DetailViewModule { }
