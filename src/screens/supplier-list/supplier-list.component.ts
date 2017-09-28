import { Component, OnInit } from '@angular/core';
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating";


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  items : any;

  avgRating : number = 0;
  publisher : string;
  price: number = 0;
  quality: number = 0;
  bidResponse: number = 0;
  messageResponse: number = 0;
  technical: number = 0;
  total: number = 0;

  constructor() { }

  ngOnInit() {
    this.items = ['1','2','3','4'];
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
