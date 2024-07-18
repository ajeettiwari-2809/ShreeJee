import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../Model/user';
import { VehicleRequisitionServicesService } from '../services/vehicle-requisition-services.service';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  authResponse: any;
  userName:string;
  loginResponse: any;
  user: User;

  constructor( private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUserInfo();
    this.user = new User();
    this.loginService.getLoginListener().subscribe((response: any) => {
      this.loginResponse = response;
      console.log('user Topnav', this.loginResponse);
      this.userName = response.appuser.userName;
     
  })
}

  logout(){
    //this.authService.logout();
    window.open("https://asms.prismcement.com", "_self")

  }
  isUserAuthenticated(){
    return this.loginService.getIsAuthenticated();
  }

}
