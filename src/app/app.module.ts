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
import { RegistrationComponent } from './users/registration/registration.component';
import {MatCardModule} from '@angular/material/card';
import { AsignacionesComponent } from './newLife/asignaciones/asignaciones.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PeopleComponent } from './people/individual/people.component'
import {MatTabsModule} from '@angular/material/tabs';
import { ServiciosComponent } from './people/partials/servicios/servicios.component';
import { SetupComponent } from './people/partials/setup/setup.component';
import {MatChipsModule} from '@angular/material/chips';
import { LogoutComponent } from './logout/logout.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NewPeopleComponent } from './people/new-people/new-people.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DndModule } from 'ngx-drag-drop';
import { NewLifeComponent } from './people/partials/new-life/new-life.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NavigatorComponent } from './partials/navigator/navigator.component';
import { Normalizer } from './helpers/people.model';
import { CreckPermissionDirectiveDirective } from './helpers/creck-permission-directive.directive';
import { MyassignsComponent } from './newLife/myassigns/myassigns.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { InterceptInterceptor } from './guard/intercept.interceptor';
import { ErrorNotFoundComponent } from './helpers/error-not-found/error-not-found.component';
import { AddCommentsComponent } from './newLife/myassigns/partials/add-comments/add-comments.component';
import { HistoricalCommentsComponent } from './newLife/myassigns/partials/historical-comments/historical-comments.component';




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
    DialogPeopleDeleteConfirmation,
    RegistrationComponent,
    AsignacionesComponent,
    PeopleComponent,
    ServiciosComponent,
    SetupComponent,
    LogoutComponent,
    NewPeopleComponent,
    NewLifeComponent,
    NavigatorComponent,
    CreckPermissionDirectiveDirective,
    MyassignsComponent,
    ErrorNotFoundComponent,
    AddCommentsComponent,
    HistoricalCommentsComponent

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
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    DragDropModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    DndModule,
    MatBadgeModule,



    ],
  providers: [
    Normalizer,
    { provide:HTTP_INTERCEPTORS, useClass: InterceptInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
