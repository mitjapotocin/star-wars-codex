import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterCardComponent,
    HomeComponent,
    SearchInputComponent
  ],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [],
})
export class HomeModule { }
