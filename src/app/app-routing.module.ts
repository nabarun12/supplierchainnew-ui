import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListComponent } from '../screens/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from '../screens/supplier-details/supplier-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/supplier-list', pathMatch: 'full'
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
