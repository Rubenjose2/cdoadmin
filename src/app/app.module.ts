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
import {MatSidenavModule} from '@angular/material/sidenav';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { DiscipulosComponent } from './newLife/discipulos/discipulos.component';
import { LoginComponent } from './users/login/login.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { DialogPeopleDeleteConfirmation, EncuentroPeopleComponent } from './encuentros/encuentro-people/encuentro-people.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';



//Import from Firebase


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncuentrosComponent,
    UsersComponent,
    MenuComponent,
    DiscipulosComponent,
    LoginComponent,
    EncuentroPeopleComponent,
    DialogPeopleDeleteConfirmation
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,  
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    MatSelectModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDividerModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule
    
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
