import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DetailViewComponent } from './detail-view.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    DetailViewComponent,
    DetailComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [],
})
export class DetailViewModule { }
