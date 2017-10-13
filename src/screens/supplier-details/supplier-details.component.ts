import { Component, OnInit } from '@angular/core';
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating";
import { AppGlobals } from '../../common/models/global';
import { Supplier } from '../../common/models/supplier';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

  avgRating : number = 0;
  publisher : string;
  price: number = 2.5;
  quality: number = 4.5;
  bidResponse: number = 1;
  messageResponse: number = 5;
  technical: number = 2;
  total: number = 0;

 
  passedUser : Supplier;
  registeredUser : Supplier;
  items : any;
  
  constructor(private _globals : AppGlobals ) { }

  ngOnInit() {
    this.items = ['1','2','3','4'];
    this.passedUser =  this._globals.getPassedSupplier();
    console.log(this.passedUser);
  }



    onRatingChange = ($event:OnRatingChangeEven, type) => {
        console.log('onRatingUpdated $event: ', $event);
        switch(type)
        {
          case 'PRICE':
          {
            this.price = $event.rating;
            break;
          }
          case 'QUALITY':
          {
            this.quality = $event.rating;
            break;
          }
          case 'BIDRESPONSE':
          {
            this.bidResponse = $event.rating;
            break;
          }
          case 'MESSAGERESPONSE':
          {
            this.messageResponse = $event.rating;
            break;
          }
          case 'TECHNICAL':
          {
            this.technical = $event.rating;
            break;
          }
        }
        this.checkRating();
    };
  public checkRating() 
  {
    this.total = this.price + this.quality + this.bidResponse + this.messageResponse + this.technical;
    this.avgRating = this.total/5;
    console.log("hello");
    
  }


}
