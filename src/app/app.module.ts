import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EncuentrosComponent } from './encuentros/encuentros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './partials/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavComponent } from './partials/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncuentrosComponent,
    UsersComponent,
    MenuComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,  
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
