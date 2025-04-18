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
import { DisplayParagraphComponent } from './component/display-paragraph/display-paragraph.component';
import { RessourcesListComponent } from './view/ressources-list/ressources-list.component';
import { RessourceCardComponent } from './component/ressource-card/ressource-card.component';
import { ArticlePageComponent } from './view/article-page/article-page.component';
import { TestPageComponent } from './view/test-page/test-page.component';
import { DisplayArticleHeaderComponent } from './component/display-article-header/display-article-header.component';
import { DisplayQuestionComponent } from './component/display-question/display-question.component';
import { ModifyArticleComponent } from './component/modify-article/modify-article.component';
import { ModifyTestComponent } from './component/modify-test/modify-test.component';
import { DisplayTestHeaderComponent } from './component/display-test-header/display-test-header.component';
import { DisplayTestResultComponent } from './component/display-test-result/display-test-result.component';

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
    DisplayParagraphComponent,
    RessourcesListComponent,
    RessourceCardComponent,
    ArticlePageComponent,
    TestPageComponent,
    DisplayArticleHeaderComponent,
    DisplayQuestionComponent,
    ModifyArticleComponent,
    ModifyTestComponent,
    DisplayTestHeaderComponent,
    DisplayTestResultComponent
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
