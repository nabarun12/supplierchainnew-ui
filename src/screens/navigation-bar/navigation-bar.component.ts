import { Component, OnInit }        from '@angular/core';
import { Location }                 from '@angular/common';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  type : string;

  constructor(private location: Location){}
                

  ngOnInit() 
  {
    if(location.pathname === '/')
    {
      this.type = 'dashboard';
    }
    else
    {
      this.type = location.pathname.substring(1);
    }
  }

}
