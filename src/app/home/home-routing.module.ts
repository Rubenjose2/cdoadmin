import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../users/login/login.component';
import { EncuentrosComponent } from '../encuentros/encuentros.component';
import { AuthGuard } from '../guard/auth.guard';
import { DiscipulosComponent } from '../newLife/discipulos/discipulos.component';

const routes: Routes = [
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule { }
