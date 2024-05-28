import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/tache/tache.module').then((m) => m.TacheModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/tache/tache.module').then((m) => m.TacheModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/entreprise/entreprise.module').then((m) => m.EntrepriseModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/prospect/prospect.module').then((m) => m.ProspectModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/provenance/provenance.module').then((m) => m.ProvenanceModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/pre-contrat/pre-contrat.module').then((m) => m.PreContratModule),
      },

    ],
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaoutRoutingModule { }
