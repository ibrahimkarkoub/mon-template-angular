import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from 'src/app/core/services/loginGaurd';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate: [LoginGuard], },
  { path: 'forgot-password', component: ForgotPasswordComponent },

];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AuthRoutingModule { }
