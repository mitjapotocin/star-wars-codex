import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { HomeComponent } from './components/home/home.component';

enum BaseRoutes {
  characters = 'characters'
}

const routes: Routes = [
  {
    path: BaseRoutes.characters,
    children: [
      {
        path: ':slug',
        component: DetailViewComponent
      },
      {
        path: '',
        component: HomeComponent,
      }
    ]
  },  
  {
    path: '',
    redirectTo: BaseRoutes.characters,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
