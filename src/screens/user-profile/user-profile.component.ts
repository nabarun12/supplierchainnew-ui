import { Component, OnInit } from '@angular/core';

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

  items : any;

  constructor() { }

  ngOnInit() {
    this.items = ['1','2','3','4'];
  }

}
