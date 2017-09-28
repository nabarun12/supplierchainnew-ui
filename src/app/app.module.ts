import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupplierListComponent } from '../screens/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from '../screens/supplier-details/supplier-details.component';
import { HeaderComponent } from './header/header.component';
import { SupplierChainService } from '../common/services/supplierchain.service';
import { SupplierMetaService } from '../common/services/suppliersmeta.service';
import { ConfigurationProvider } from '../config/configuration.provider';

import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    SupplierListComponent,
    SupplierDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
