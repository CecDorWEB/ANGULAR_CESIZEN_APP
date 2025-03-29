import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './component/log-in/log-in.component';
import { HomeComponent } from './view/home/home.component';
import { AdminComponent } from './view/admin/admin.component';
import { AdminDashbordComponent } from './component/admin-dashbord/admin-dashbord.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { EditRessourceComponent } from './component/edit-ressource/edit-ressource.component';
import { ModifyRessourceComponent } from './component/modify-ressource/modify-ressource.component';
import { RessourcesListComponent } from './view/ressources-list/ressources-list.component';
import { ArticlePageComponent } from './view/article-page/article-page.component';
import { TestPageComponent } from './view/test-page/test-page.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: ':type', component: RessourcesListComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: AdminDashbordComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'ressources/:type', component: EditRessourceComponent },
      {
        path: 'ressources/:type/:id/modify',
        component: ModifyRessourceComponent,
      },
    ],
  },
  { path: 'article/:id', component: ArticlePageComponent },
  { path: 'test/:id', component: TestPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
