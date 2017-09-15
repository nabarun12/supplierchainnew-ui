import 'zone.js/dist/zone-mix';

import 'reflect-metadata';

import 'polyfills';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';

import { ConfigurationProvider } from '../config/configuration.provider';

import { SupplierChainService } from '../common/services/supplierchain.service';
import { SupplierMetaService } from '../common/services/suppliersmeta.service';

import { NavbarComponent } from '../common/components/navbar/navbar.component';

import { HomeComponent } from '../screens/home/home.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, NavbarComponent],
    imports: [
        BrowserModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [ElectronService, ConfigurationProvider, SupplierChainService, SupplierMetaService],
    bootstrap: [AppComponent]
})
export class AppModule {}
