import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ReferenceFormComponent } from './reference/reference-form/reference-form.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './services/auth-guard.service';
import {ReferencesService} from './services/references.service';
import {UserService} from './services/user.service';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {VillesService} from './services/villes.service';
import { ReferenceListComponent } from './reference/reference-list/reference-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SingleReferenceComponent} from './reference/single-reference/single-reference.component';
import {UsersService} from './services/users.service';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'references', component: ReferenceListComponent },
  { path: 'reference/view/:id', component: SingleReferenceComponent},
  { path: 'reference/new', canActivate: [UserService], component: ReferenceFormComponent},
  { path: 'reference/edit', canActivate: [UserService], component: ReferenceFormComponent},
  { path: 'users', canActivate: [UserService], component: UserListComponent},
  { path: 'user/create', canActivate: [UserService], component: UserFormComponent},
  { path: 'user/edit/:id', canActivate: [UserService], component: UserFormComponent},
  { path: '', redirectTo: 'references', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ReferenceFormComponent,
    UserFormComponent,
    HeaderComponent,
    SingleReferenceComponent,
    ReferenceListComponent,
    UserListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    PDFExportModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService, ReferencesService, UserService, UsersService, VillesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
