import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferenceComponent } from './reference/reference.component';
import { ReferenceViewPublicComponent } from './reference/reference-view-public/reference-view-public.component';
import { ReferenceViewPrivateComponent } from './reference/reference-view-private/reference-view-private.component';
import { AuthComponent } from './auth/auth.component';
import { ReferenceFormComponent } from './reference/reference-form/reference-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ReferencesService} from './services/references.service';
import {UserService} from './services/user.service';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SingleReferencePrivateComponent } from './reference/single-reference-private/single-reference-private.component';
import { SingleReferencePublicComponent } from './reference/single-reference-public/single-reference-public.component';
import { ReferenceViewComponent } from './reference/reference-view/reference-view.component';
import { SingleReferenceComponent } from './reference/single-reference/single-reference.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'references', component: ReferenceViewComponent },
  { path: 'reference/view/:id', component: SingleReferenceComponent},
  { path: '', redirectTo: 'references', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ReferenceComponent,
    ReferenceViewPublicComponent,
    ReferenceViewPrivateComponent,
    AuthComponent,
    ReferenceFormComponent,
    UserFormComponent,
    HeaderComponent,
    SingleReferencePrivateComponent,
    SingleReferencePublicComponent,
    ReferenceViewComponent,
    SingleReferenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, ReferencesService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
