import { Component, OnInit } from '@angular/core';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { Supplier } from '../../common/models/supplier';

@Component({ 
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  fullName :string = "";
  address : string = "";
  phoneNo : string = "";
  userName :string = "";
  passWord : string ="";
  emailAddress : string ="";
  signupSupplier : Supplier = null;
  
  

  constructor(private _supplierMetaService: SupplierMetaService) { }

  public registerUser(){

     
  }


  public uploadFile(files){
    
     this._supplierMetaService
     .uploadFile(files[0], this.fullName)
     .then((rep: String) => {
         console.info(rep);
         this._supplierMetaService.createSupplier

     })
     .catch((error: Error) => {
         console.error(error);
     }); 
     console.log(files[0].path);
 }

  ngOnInit() {
  }


}
