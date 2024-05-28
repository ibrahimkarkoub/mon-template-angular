import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DialogViewUserComponent } from './components/dialog-view-user/dialog-view-user.component';

import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';
import { AuthGuard } from 'src/app/core/services/authGuard';

const routes: Routes = [
  { path: 'liste-user', component: ListeUserComponent , canActivate: [AuthGuard], },
  { path: 'view-user', component: ViewUserComponent, canActivate: [AuthGuard], },
  { path: 'change-password', component: ChangePasswordComponent , canActivate: [AuthGuard], },
  { path: '', redirectTo: 'liste-user', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserManagementRoutingModule { }
