import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { RegisterComponent } from './component/register/register.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './view/home/home.component';
import { AdminComponent } from './view/admin/admin.component';
import { AdminDashbordComponent } from './component/admin-dashbord/admin-dashbord.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { EditRessourceComponent } from './component/edit-ressource/edit-ressource.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { CreateRessourceComponent } from './component/create-ressource/create-ressource.component';
import { ModifyRessourceComponent } from './component/modify-ressource/modify-ressource.component';
import { DisplayStartRessourceComponent } from './component/display-start-ressource/display-start-ressource.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    AdminDashbordComponent,
    UserManagementComponent,
    EditRessourceComponent,
    CreateRessourceComponent,
    ModifyRessourceComponent,
    DisplayStartRessourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
