import {Supplier} from './supplier';
import { Injectable } from '@angular/core';

 @Injectable() export class AppGlobals {
   // use this property for property binding
   public supplierMatchingWithName: Supplier = null;
   public supplierMatchingPassed: Supplier = null;
   public registeredUsers: Supplier = null;

   setSupplier(isLoggedIn){
       this.supplierMatchingWithName = isLoggedIn;
   }

   getLoggedSupplier(){
       return this.supplierMatchingWithName;
       
   } 
   setPassedSupplier(isLoggedIn){
    this.supplierMatchingPassed = isLoggedIn;
}

    getPassedSupplier(){
    return this.supplierMatchingPassed;
}

setRegisteredSupplier(isLoggedIn){
    this.registeredUsers = isLoggedIn;
}

getRegisteredSupplier(){
    return this.registeredUsers;
    
} 

}
 