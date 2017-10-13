import { Component, OnInit } from '@angular/core';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { SupplierChainService } from '../../common/services/supplierchain.service';

import { Supplier } from '../../common/models/supplier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  fullName: string = "";
  walletaddress: string = "";
  phoneNo: string = "";
  passWord: string = "";
  emailAddress: string = "";
  signupSupplier: Supplier = new Supplier('');
  addresses: string[] = [];
  errormessage: string = '';
  successmessage: string = '';

  constructor(private _supplierMetaService: SupplierMetaService, private _supplierChainService: SupplierChainService, private _router: Router) { }


  public registerUser(files) {

    /*if(files[0] == undefined){
       this.errormessage = "Please upload a valid .doc/.docx file"
      return;
     }*/
    this._supplierChainService
      .getNewAddress()
      .then((address: string) => {
        this.walletaddress = address;
        this.signupSupplier.walletAddress = this.walletaddress;
        this.signupSupplier.key = this.signupSupplier.supplierName;
        this.signupSupplier.isAdmin=0;
        this.signupSupplier.isRegistered = 0;
        this._supplierMetaService.createSupplier(this.signupSupplier)
          .then(() => {
            this.successmessage = "Supplier request has been submitted. Please wait for Admin to approve.You will be redirected to login page"
            this.delay(5000).then(() => { this._router.navigateByUrl('login') });

          })
          .catch((error: Error) => {
            console.error(error);
            this.errormessage = " Error in Signing up "
            return;
          });

      })
      .catch((error: Error) => {
        console.error(error);
        this.errormessage = " Error in Signing up "
        return;
      });

  }


  removeerror() {

    this.errormessage = "";

    this.successmessage = "";
  }


  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public uploadFile(files: File[]) {

    if (files == undefined)
      return "FAIL"
    this._supplierMetaService
      .uploadFile(files[0], this.fullName)
      .then((rep: String) => {
        console.info(rep);


      })
      .catch((error: Error) => {
        console.error(error);
      });
    console.log(files[0].path);
  }

  ngOnInit() {

  }


}
