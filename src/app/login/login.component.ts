import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Model/user';
import { PwaService } from '../_services/pwa.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseResult } from '../Model/responseResult';
import { ComponentPortal } from '@angular/cdk/portal';






import { Result } from '../Model/result';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { AuthTokenService } from './auth-token.service';

import { max } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  otpForm: FormGroup;
  showLoginblock = false;
  showEmailBlock = false;
    private user1: User;
  showForgetPasswordBlock = false;
  overlayRef: any;
  constructor(private router: Router,private spinner: NgxSpinnerService,private formBuilder: FormBuilder, private authTokenService: AuthTokenService,private toastr: ToastrService,private overlay: Overlay,private authService: LoginService,) { }
  model:any={};
  loginForm: FormGroup;
  VehicleType:any[];
  forgotPwForm: FormGroup;
  
  emailPattern12 = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  http: any;
  authToken: any;
  decodeToken: any;
  jwtHelper: any;
  userInfo: any;
  isAuthenticated: boolean;
  ngZone: any;

  result: ResponseResult;
  loginResult: Result;
  //router: any;
  authStatusListener: any;
  private userdata:User;
  loginstatus:boolean=false;
 
 ngOnInit(): void {
  this.userdata = new User();
   this.getsecure();
   this.VehicleType=[];
   this.showLoginblock = true;
   this.user1 = new User();
 }
 getsecure()
 {
  this.loginForm = new FormGroup({
    emaildata:  new FormControl('', [Validators.required],),
 
    passworddata:new  FormControl('',[Validators.required],)
 
  });
 }



 
  emailPattern(emailPattern: any) {
    throw new Error('Method not implemented.');
  }





  onLoginSubmit()
  {
    console.log("data112");

    this.userdata.userName = this.loginForm.value.emaildata;
    this.userdata.password = this.loginForm.value.passworddata;
    this.userdata.appVersion='V003';
    // console.log("loginName", this.userdata.userName);
    // console.log("loginPassword", this.userdata.password);
          console.log(   "all data setr" ,this.userdata);
         this.spinner.show();
  


  
  this.authTokenService.loginUser(this.userdata);
  this.authTokenService.getAuthStatusListener().subscribe(
    (r: any) => {
      
      this.hideOverlay();
      this.spinner.hide();
      this.result = r;
      console.log('user details in component', this.result);
     // this.userId = r.appuser.id;
    // console.log('userid', this.userId);
       if (this.result.status === 200) {
        
        this.toastr.success(this.result.message);
       // this.loginForm.get('email').disable();

        this.loginstatus=true;

      }
      else if(this.result.status === 401) {
        this.toastr.error(this.result.message);
      }
      else if(this.result.status === 500) {
        this.toastr.error('Internal server Error');
      }
      else {
        this.toastr.error(this.result.message);
      }
    },
    (error) => {
      this.loginResult.message = error.message;
      this.loginResult.statusCode = error.statusCode;
      //this.hideOverlay();
      this.toastr.error(error.message);
      /* console.log('errorr', error.message); */
    }
  );


   

//console.log(this.loginForm.value.emaildata);

        // this.router.navigate(['/dashboard']);
  // this.http.post('', this.user)
  //   .subscribe(r => {
  //    // console.log("r ka value", r);
  //     //if codf{}
  //     if (r.status === 200 ) {
        
      

  //     }

  // });

  //console.log("loginPassword", this.user.password);


    // console.log(this.loginForm.value);
    // var data112= this.loginForm.value ;
   // console.log(data112);

    
    
  }

  getEmailForOTP(){
    console.log('Login Forgot');
    this.otpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4),
        Validators.maxLength(6)]]
    });
    this.showEmailBlock = true;
    this.showForgetPasswordBlock = false;
    this.showLoginblock = false;
  }
  LoginFormVisibality(){
    this.showEmailBlock = false;
    this.showForgetPasswordBlock = false;
    this.showLoginblock = true;
  }
  resetPassword(){
    this.forgotPwForm = this.formBuilder.group({
      'userOTP':['',[Validators.required]],
      'password': ['',[Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      'confirmPassword': ['',RxwebValidators.compare({fieldName:'password'})]
    });
    this.showForgetPasswordBlock =  true;
    this.showEmailBlock = false;
    this.showLoginblock = false;
  }
  onEmailSubmit(){
    if (!this.otpForm.valid) {
      return;
    }
    this.spinner.show();

    this.user1.userName = this.otpForm.value.email;

    this.authTokenService.generateOTP(this.user1);

    this.authTokenService.getOTPStatusListener().subscribe(
      (r:any) =>{
        this.spinner.hide();
        this.result = r;
       // console.log("r ka value otp in component", this.result);
        if (this.result.status === 200){
          this.toastr.success(this.result.message);
         /*  this.showEmailBlock = false;
          this.showForgetPasswordBlock = true;
          this.showLoginblock = false; */
          this.resetPassword();
        }
       else if (this.result.status != 200){
          this.toastr.success(this.result.message);
         /*  this.showEmailBlock = false;
          this.showForgetPasswordBlock = true;
          this.showLoginblock = false; */
        
        }
      }
    )

  }
  onPasswordChange(){
    if (!this.otpForm.valid) {
      return;
    }
    this.spinner.show();
    this.user1.userOTP = this.forgotPwForm.value.userOTP;
    this.user1.password = this.forgotPwForm.value.password;
     this.authTokenService.changePassword(this.user1);
    this.authTokenService.getPasswordListener().subscribe(
      (r: any) =>{
        this.spinner.hide();
        this.result = r;
        if(this.result.status === 200){
          this.toastr.info(this.result.message);
          this.showForgetPasswordBlock=false;
          this.showLoginblock=true;
          this.router.navigate(['/']);
          // this.createLoginForm();
        }

      else  if(this.result.status != 200){
          this.toastr.info(this.result.message);
          // this.router.navigate(['']);
          // this.createLoginForm();
        }
      }
    );
  }
  hideOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
  showOverlay() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });

  }
  user<T>(arg0: string, user: any) {
    throw new Error('Method not implemented.');
  }
  saveTokenData(authToken: any, arg1: null, user: any) {
    throw new Error('Method not implemented.');
  }
}
