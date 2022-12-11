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
import { AsignacionesComponent } from './newLife/asignaciones/asignaciones.component';
import { PeopleComponent } from './people/individual/people.component';
import { LogoutComponent } from './logout/logout.component';
import { NewPeopleComponent } from './people/new-people/new-people.component';
import { MyassignsComponent } from './newLife/myassigns/myassigns.component';
import { ErrorNotFoundComponent } from './helpers/error-not-found/error-not-found.component';
import { ThanksLandPageComponent } from './users/thanks-land-page/thanks-land-page.component';
import { PasswordManagementComponent } from './users/password-management/password-management.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';

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
            path:'newpeople',
            component:NewPeopleComponent
          },
          {
            path:'discipuladores',
            component:DiscipulosComponent
          },
          {
            path:'asignaciones',
            component:AsignacionesComponent
          },
          {
            path:'myassigns',
            component:MyassignsComponent
          }
        ]
      },
      // People
      {
        path:'people',
        component:PeopleComponent
      },
      {
        path:'logout',
        component: LogoutComponent
      },

    ],canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registration',
    component: RegistrationComponent
  },
  {
    path:'thanks',
    component:ThanksLandPageComponent
  },
  {
    path:'password_management',
    component:PasswordManagementComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  {
    path:'**',
    component: ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
