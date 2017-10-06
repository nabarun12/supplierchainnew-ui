import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListComponent } from '../screens/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from '../screens/supplier-details/supplier-details.component';
import { UserProfileComponent } from '../screens/user-profile/user-profile.component';
import { LoginPageComponent } from '../screens/login-page/login-page.component';
import { SignupPageComponent } from '../screens/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'signup', component: SignupPageComponent
  },
  {
    path: 'user-profile', component: UserProfileComponent
  },
  {
    path: 'supplier-list', component: SupplierListComponent
  },
  {
    path: 'supplier-details', component: SupplierDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
