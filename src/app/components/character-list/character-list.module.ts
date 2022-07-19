import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterListComponent } from './character-list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const components = [
  CharacterListComponent,
  CharacterCardComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    ...components
  ],
  providers: [],
})
export class CharacterListModule { }
