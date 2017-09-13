import 'zone.js/dist/zone-mix';

import 'reflect-metadata';

import 'polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { SupplierChainService } from './providers/supplierchain.service';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    providers: [ElectronService, SupplierChainService],
    bootstrap: [AppComponent]
})
export class AppModule {}
