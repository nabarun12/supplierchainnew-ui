import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { Supplier } from '../../common/models/supplier';
import { AppGlobals } from '../../common/models/global';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

 
  userName : string ="";
  password : string ="";
  public errorMsg = '';

  constructor(private _supplierMetaService: SupplierMetaService, private _router: Router, private _globals : AppGlobals ){ }

  removeerror(){

    this.errorMsg = "";
  }
e
  login(){
    if(this.userName == undefined || this.userName == ""){
        this.errorMsg = 'Please fill in name';
        return;
    }
    this._supplierMetaService
    .fetchSupplierByName(this.userName)
    .then((supplier: Supplier) => {
      if(supplier.isRegistered == 1){
       this._globals.setSupplier(supplier);
        this._router.navigateByUrl('supplier-list');
      }
      else{
        this.errorMsg = 'Failed to login';
      }
    })
    
    .catch((error: Error) => {
      this.errorMsg = 'Failed to login';
      console.error(error);
    });

  }

  ngOnInit() {
  }

}
