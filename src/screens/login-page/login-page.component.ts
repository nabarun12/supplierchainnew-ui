import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { Supplier } from '../../common/models/supplier';
import { AppGlobals } from '../../common/models/global';
import { SignupPageComponent } from '../../screens/signup-page/signup-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

 
  userName : string ="";
  password : string ="";
  public errorMsg = '';
  loaderInd : boolean = false;

  constructor(private _supplierMetaService: SupplierMetaService, private _router: Router, private _globals : AppGlobals, private signupPageComponent:SignupPageComponent ){ }

  removeerror(){

    this.errorMsg = "";
  }

  login(){
    if(this.userName == undefined || this.userName == ""){
        this.errorMsg = 'Please fill in name';
        return;
    }
    this.loaderInd = true;
    
    this._supplierMetaService
    .fetchSupplierByName(this.userName)
    .then((supplier: Supplier) => {
      if(supplier.isRegistered == 1){
       this._globals.setSupplier(supplier);
       this.signupPageComponent.delay(2000).then(() => { this._router.navigateByUrl('supplier-list') })
      }
      else{
        this.loaderInd = false;
        this.errorMsg = 'Failed to login';
      }
    })
    
    .catch((error: Error) => {
      this.loaderInd = false;
      this.errorMsg = 'Failed to login';
      console.error(error);
    });

  }

  ngOnInit() {
  }

}
