import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { DetailViewModule } from './components/detail-view/detail-view.module';
import { HomeModule } from './components/home/home.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    DetailViewModule,
    HttpClientModule,
    BrowserModule,
    HomeModule,
    MatSlideToggleModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
