import { Injectable, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ok } from 'assert';
import { User } from '../Model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Overlay,  } from '@angular/cdk/overlay';
@Injectable({
  providedIn: 'root'
})


 export class AuthTokenService {
  jwtHelper = new JwtHelperService();
  private authToken: string;
  private user: User;
  private appUser: any;
  private isAuthenticated = false;
  private username: any;
  private isAuthorized = false;
  private isBTM = false;
  private isInfluencer = false;
  private isTTE = false;
  private isAdmin = false;
  private isRTM = false;
  private isTSE = false;
  private isBM = false;
  private isRM = false;
  private isZM = false;
  private isCOCHE = false;
  private isRAC = false;
  private isCAC = false;
  private isCMO = false;
  private isCMOBI = false;
  private tokenTimer: any;
  decodeToken: any;
  userInfo: any;
  private authStatusListener = new Subject<User>();
  private otpListener = new Subject<User>();
  private passwordListener = new Subject<User>();

  constructor(private http: HttpClient, private router: Router,private spinner: NgxSpinnerService, private ngZone: NgZone,private toastr: ToastrService,private overlay: Overlay,) { }

  loginUser(user: User) 
  {
    // this.user = new User();

    // this.user.userName = user.userName;
    // this.user.password = user.password;

    // console.log("loginName12",user.userName);
    // console.log("loginPassword12", user.password);

    console.log("Again data set" ,user);
    // this.router.navigate(['/Alldashboard']);

    
      return this.http.post<any>(environment.apiurl + 'Auth/userlogin',user)
      .subscribe(r => {
       console.log("r ka value", r);
        //if codf{}
        if (r.status === 200 ) {
          
        this.authToken = r.token;
        console.log("All token set is" + this.authToken);
        this.decodeToken = this.jwtHelper.decodeToken(r.token);
        localStorage.setItem('user', JSON.stringify(r));
      //  console.log("decoded Token", this.decodeToken);
        this.userInfo = r.appuser;
        this.user = new User();
        this.isAuthenticated = true;
       // this.user.fullName = r.appuser.userName;
        this.user.roleName = r.appuser.role.roleCode;
  
        this.username=r.appuser.userName;
        this.saveTokenData(this.authToken, null, this.user);
        this.ngZone.run(() => {
           if (!this.user.roleName){
            this.router.navigate(['/about-program']);
          }
          
         else  if (this.user.roleName =='User' || this.user.roleName =='HOD' ||
         this.user.roleName =='GetSecurity' ||this.user.roleName =='HODSecurity' ||this.user.roleName =='VPADM' ||this.user.roleName =='VMANG' ){
          this.isAuthorized = true;
          this.isInfluencer = true;
          
          this.router.navigate(['/home']);
        
  
          }
  
      
         
  
        });
        }
        this.authStatusListener.next(r);
  
    },
    err=>{ 
      
     this.spinner.hide();
      
        this.toastr.info('This Is your first time login . Kindly Forgot password to login');

      console.log("Catch Exception "+err);
      console.log(err);}
 
      );
   
  
}
 autoAuthUser() {
    const authInformation = this.getTokenData();
   if (!authInformation){
     return;
   }
    const now = new Date();
    const user = authInformation.user;
    }

   // const now = new Date();
   // const expiresDuration = authInformation.expiration.getTime() - now.getTime();
   // const user = authInformation.user;
    //token decode and validate token expiry

    /* if (1 > 0) { //token not expired
      this.isAuthenticated = true;
      this.authToken = authInformation.token;
      this.user = user;
      this.user.isAuthenticated = true;
      this.authStatusListener.next(user);
      //call role define function
    } */


  getToken() {
    return this.authToken;
  }
  getAppUser() {
    return this.appUser;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getUserName()
  {
    return this.username;
  }
  getIsAuthorized(){
    return this.isAuthorized;
  }
  getIsBTM(){
    return this.isBTM;
  }
  getIsRTM(){
    return this.isRTM;
  }
  getIsTTE(){
    return this.isTTE;
  }
  getIsInfluencer(){
    return this.isInfluencer;
  }
  getIsAdmin(){
    return this.isAdmin;
  }
  getIsTSE(){
    return this.isTSE;
  }
  getIsBM(){
    return this.isBM;
  }

  getIsRM(){
    return this.isRM;
  }
  getIsZM(){
    return this.isZM;
  }
  getIsCMO(){
    return this.isCMO;
  }
  getIsRAC(){
    return this.isRAC;
  }
  getIsCAC(){
    return this.isCAC;
  }
  getIsBIHead(){
    return this.isCMOBI;
  }
  getIsCOCHE(){
    return this.isCOCHE;
  }
  getUserInfo() {
    return this.userInfo;
  }
  getUserRole() {

    return this.user.roleName;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  ngOnInit() {

  }

  logout() {
    this.authToken = null;
    //localStorage.removeItem('user');
   // this.authStatusListener.next(null);
    this.clearTokenData();
    this.isAuthenticated = false;
    this.isTTE = false;
    this.isInfluencer = false;
    this.isBTM = false;
    localStorage.clear();
    window.location.reload();

  }

  generateOTP(user: User){
    this.user = new User();
    this.user.userName = user.userName;
    this.http.post<any>(environment.apiurl + 'Auth/forgotPassword', this.user).subscribe(
      r =>{
        this.otpListener.next(r);
      }
    )
  }

  changePassword(user: User){
    this.user = new User();
    this.user.userOTP = user.userOTP;
    this.user.password = user.password;
    this.http.post<any>(environment.apiurl + 'Auth/changePassword', this.user).subscribe(
      r => {
        console.log("r ka value password change pr", r);
        this.passwordListener.next(r);
      }
    );
  }
  getPasswordListener(){
    return this.passwordListener.asObservable();
  }
  getOTPStatusListener(){
    return this.otpListener.asObservable();
  }

  private setTokenTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
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
