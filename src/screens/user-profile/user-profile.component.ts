import { Component, OnInit, Input } from '@angular/core';
import { AppGlobals } from '../../common/models/global';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { Supplier } from '../../common/models/supplier';
import { RatingUi } from '../../common/models/rating-ui';
import { Verification } from '../../common/models/verification';
import { SupplierListComponent } from '../../screens/supplier-list/supplier-list.component';
import { SupplierChainService } from '../../common/services/supplierchain.service';
import { StreamItem } from '../../common/models/stream-item';
import { default as _ } from 'lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  avgRating : number = 0;
  publisher : string;
  price: number = 2.5;
  quality: number = 4.5;
  bidResponse: number = 1;
  messageResponse: number = 5;
  technical: number = 2;
  total: number = 0;
  ratings: Number[] = [1,2,3,4,5];
  toggleIcon : boolean = true;
  streamVerifyItems : StreamItem[] = null;
  verifyitems : Verification[] = null;

  @Input()
  passedUser : Supplier;

  registeredUser : Supplier;

  items : any;

  constructor(private _supplierChainService: SupplierChainService, private _globals : AppGlobals , private _supplierListComponent : SupplierListComponent) { }
  
  /*organizeverifyitems(){

    var index;
    var verifyitemLocal : Verification;
    var counter = new Array();
    var supplier = new Supplier('');
    var ts = Date.now();
    
    this.streamVerifyItems.forEach(streamItem => {

        console.info("here now" + ts);
        console.info("here" + new Date(streamItem.blocktime).getDate() + '-' + new Date(streamItem.blocktime).getMonth() + 1 + '-' + new Date(streamItem.blocktime).getFullYear());
       
        if (this.verifyitems == undefined) 
            this.verifyitems = new Array<Verification>();
        verifyitemLocal = new Verification(0);
        verifyitemLocal = this._supplierListComponent.convertHexToObject(streamItem.data);
        this.verifyitems.push(verifyitemLocal);
         
    });

  }
  verifyUser(){
    
    var verifyLocal;
    var supplier = _.find(this._globals.getRegisteredSupplier(), (datum: Supplier) => {
      return this.registeredUser.walletAddress == datum.walletAddress;
    });

    verifyLocal.verified = true;
    verifyLocal.timeofrating = Date.now();
    verifyLocal.supplierName = supplier.supplierName;
   
  
    this._supplierChainService
    .publishfrom(this.registeredUser.walletAddress, 'testverify', this.registeredUser.walletAddress, this._supplierListComponent.convertObjectToHex(verifyLocal))
    .then((res: any) => {
        console.info(res);
        this._supplierChainService
            .listStreamKeyItems('testverify', this.registeredUser.walletAddress)
            .then((items: StreamItem[]) => {
                this.streamVerifyItems = items;
                this.organizeverifyitems();
            })
            .catch((error: Error) => {
              //  this.loaderInd = false;
                console.error(error);
            });
    })
    .catch((error: Error) => {
        //this.loaderInd = false;
        console.error(error);
    });


  }
  */
  setClasses(ratingCurr:Number,ratingSupp : Number) {
      let classes = {
          
          'fa-star' : !((ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf() - ratingCurr.valueOf()) < 0),
          'staryellow' : (ratingSupp.valueOf() - ratingCurr.valueOf()) >= 0 || ((ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf()- ratingCurr.valueOf()) < 0) ,
          'fa-star-half-o' : (ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf() - ratingCurr.valueOf()) < 0,
      }
      return classes;
  
    }
  

  ngOnInit() {
    this.items = ['1','2','3','4','5'];
    this.registeredUser =  this._globals.getLoggedSupplier();
    this.registeredUser.averagerating = this.registeredUser.averagerating == undefined? new RatingUi(''):this.registeredUser.averagerating;
    this.registeredUser.ratings = this.registeredUser.ratings == undefined? new Array<RatingUi>():this.registeredUser.ratings;
    console.log(this.passedUser);
  }

}
