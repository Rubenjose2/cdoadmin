import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuentroPeopleComponent } from './encuentros/encuentro-people/encuentro-people.component';
import { EncuentrosComponent } from './encuentros/encuentros.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { DiscipulosComponent } from './newLife/discipulos/discipulos.component';
import { LoginComponent } from './users/login/login.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { UsersComponent } from './users/users.component';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { pipe } from 'rxjs';
import { RolesGuard } from './guard/roles.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path:'users',
        component:UsersComponent, canActivate: [RolesGuard], data:{role:['superAdmin']}
      },
      {
        path: 'encuentros',
        component: EncuentrosComponent,
      },
      {
        path:'encuentros/participan',
        component: EncuentroPeopleComponent
      },
      //New Life Routing
      {
        path:'newlife',
        children: [
          {
            path:'discipuladores',
            component:DiscipulosComponent
          }
        ]
      }
    ],canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registration',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
