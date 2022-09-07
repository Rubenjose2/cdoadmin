import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuentrosComponent } from './encuentros/encuentros.component';
import { HomeComponent } from './home/home.component';
import { DiscipulosComponent } from './newLife/discipulos/discipulos.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'encuentros',
    component: EncuentrosComponent
  },
  //New Life Routing
  {
    path:'newlife/discipuladores',
    component: DiscipulosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
