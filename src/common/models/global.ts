import {Supplier} from './supplier';
import { Injectable } from '@angular/core';

 @Injectable() export class AppGlobals {
   // use this property for property binding
   public supplierMatchingWithName: Supplier = null;

   setSupplier(isLoggedIn){
       this.supplierMatchingWithName = isLoggedIn;
   }

   getLoggedSupplier(){
       return this.supplierMatchingWithName;
   } }
 