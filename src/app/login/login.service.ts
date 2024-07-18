import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  jwtHelper = new JwtHelperService();
  private authToken: string;
  decodeToken: any;
  userInfo: any;
  user: User;
  role: any;
  isAuthenticated = false;
  private isUser = false;
  private isApproval = false;
  private isAdmin = false;
  private loginListener = new Subject<any>();
  

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { }

  getLoginListener(){
    return this.loginListener.asObservable();
  }

  login(user:User){
   /*  this.user = new User();
    this.user.loginToken = user.loginToken;
    console.log(this.user,'in service');
     */
    this.user = new User();

    this.user.userName = user.userName;
    this.user.password = user.password;

   
    return this.http.post<any>(environment.apiurl + 'Auth/userlogin',user)
    .subscribe((response: any) => {
      this.loginListener.next(response);
      this.authToken = response.token;
      this.userInfo  = response.appuser;
      this.user = new User();
      this.isAuthenticated = true;

      this.user.roleName = response.appuser.role.roleName;
      this.decodeToken = this.jwtHelper.decodeToken(response.token);
      localStorage.setItem('user', JSON.stringify(response));
      this.saveTokenData(this.authToken, null, this.user);

     
    
    //  console.log("decoded Token", this.decodeToken);
      
     
     // this.user.fullName = r.appuser.userName;
      // this.user.roleName = r.appuser.role.roleName;
      // this.username=r.appuser.userName;
      this.ngZone.run(() => {
        if (!this.user.roleName){
          this.router.navigate(['/about-program']);
        }
        else  if (this.user.roleName =='User'){
          console.log('user role');
          
          this.router.navigate(['/home']);
          //this.router.navigate(['/vehicleentryform']);
  
          }

        else if (this.role === 'HOD'){
          console.log('hod role');
         this.isApproval = true;
         this.isUser = true;
          this.router.navigate(['/dashboard']);
           
        }
      })
    })
  
  }


  getIsUser(){
    return this.isUser;
  }
  getIsApprover(){
    return this.isApproval;
  }
  getToken(){
    return this.authToken;
  }
  getUserInfo() {
    return this.userInfo;
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  private saveTokenData(token: string, expirationDate: Date, user: User) {
    localStorage.setItem('token', token);
   // localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearTokenData() {
    localStorage.removeItem('token');
    /* localStorage.removeItem('expiration'); */
    localStorage.removeItem('user');
  }

  private getTokenData() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    return {
      token: token,
      user: user
    };
  }
}
