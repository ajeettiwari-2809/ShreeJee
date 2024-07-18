import { Component } from '@angular/core';
import {LoginComponent} from '../app/login/login.component';
import { AuthTokenService } from './login/auth-token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private loginstatus1:LoginComponent,public authTokenService: AuthTokenService)
  {

  }
  ngOnInit() {
    this.authTokenService.autoAuthUser();
    /* this.isAuthenticated = this.authTokenService.getIsAuthenticated(); */
  }

  loginsatusfinal:boolean=this.loginstatus1.loginstatus;
  title = 'sebiClient';
  //title = 'admin-panel-layout';
  sideBarOpen = true;

  sideBarToggler() {
    
    this.sideBarOpen = !this.sideBarOpen;

  }
  isUserAuthenticated()
  {
    return this.authTokenService.getIsAuthenticated();
  }
}
