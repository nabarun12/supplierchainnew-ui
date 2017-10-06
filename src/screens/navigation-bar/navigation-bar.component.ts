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
    if(location.pathname === 'supplier-list')
    {
      this.type = 'supplier-list';
    }
    else if(location.pathname === 'user-profile')
    {
      this.type = 'user-profile';
    }
    else if(location.pathname === 'logout')
      {
        console.log("pathname: "+location.pathname);
        this.type = 'login';
      }
  }

}
