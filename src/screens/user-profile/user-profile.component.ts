import { Component, OnInit, Input } from '@angular/core';
import { AppGlobals } from '../../common/models/global';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import { Supplier } from '../../common/models/supplier';

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

  @Input()
  passedUser : Supplier;

  registeredUser : Supplier;

  items : any;

  constructor(private _globals : AppGlobals ) { }
  
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
    this.registeredUser =  this._globals.getLoggedSupplier()
    console.log(this.passedUser);
  }

}
