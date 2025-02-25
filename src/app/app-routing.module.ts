import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './component/log-in/log-in.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './view/home/home.component';
import { AdminComponent } from './view/admin/admin.component';
import { AdminDashbordComponent } from './component/admin-dashbord/admin-dashbord.component';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { AuthGuard } from './service/auth.guard';
import { EditRessourceComponent } from './component/edit-ressource/edit-ressource.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: AdminDashbordComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'ressource/:type', component: EditRessourceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
