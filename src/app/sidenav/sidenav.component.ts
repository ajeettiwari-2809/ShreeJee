import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../login/auth-token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  roletype:any;
  iconname:any;
  iconname1:any;
  asmsDetails:any;
  asmsurl:String;
  constructor(public authTokenService: AuthTokenService,private http:HttpClient,private spinner: NgxSpinnerService,) { }
buttonstatus:boolean=false;
buttonstatus1:boolean=false;

  ngOnInit(): void {
    this.iconname='add';
    this.iconname1='add';
    this.asmsurl='';

  //   this.authTokenService
  //   .getAuthStatusListener()
  //   .subscribe((response: any ) => {
  //     /* console.log('authlistener->', response); */
  //  //  console.log('appUser->', response);
  //   this.roletype = response.appuser.role.roleCode;
  //   console.log('our role data' + this.roletype);
  //   });
    this.userrole();

    this.getASMSLoginCrenditails();

  }

  userrole()
  { 
    this.roletype=this.authTokenService.getUserRole();
    console.log("Role "+this . roletype);
    return this.authTokenService.getUserRole();
  }

  getUserRole()
  {
    if(this.roletype == 'User')
    {
       return true; 
    }
    else{
      return false;
    }
  }

  isUserAuthenticated()
  {
    return this.authTokenService.getIsAuthenticated();
  }
  getSecurityrole()
  {
    if(this.roletype == 'GetSecurity')
    {
       return true; 
    }
    else{
      return false;
    }
  }
  getHODSecurityrole()
  {
    if(this.roletype == 'HODSecurity')
    {
       return true; 
    }
    else{
      return false;
    }
  }

  getVPoolManagerRole()
  {
    if(this.roletype == 'VMANG')
    {
       return true; 
    }
    else{
      return false;
    }
  }
  getHODrole()
  {
    if(this.roletype == 'HOD')
    {
      return true;
    }
    else{
      return false;
    }
  }
  getAdminrole()
  {
    if(this.roletype == 'VPADM')
    {
      return true;
    }
    else{
      return false;
    }
  }

  checkselect()
  {
    
   document.getElementById("ibutton")
    if(!this.buttonstatus)
    {
      this.iconname='remove';
      document.getElementById("ibutton").style.background='grey';
     this.buttonstatus=true;
    }
    else{
      this.iconname='add';
      document.getElementById("ibutton").style.background='transparent';
      this.buttonstatus=false;
    }
}
checkselect1()
{
  
 //document.getElementById("ibutton1")
  if(!this.buttonstatus1)
  {
    this.iconname1='remove';
    document.getElementById("ibutton1").style.background='grey';
   this.buttonstatus1=true;
  }
  else{
    this.iconname1='add';
    document.getElementById("ibutton1").style.background='transparent';
    this.buttonstatus1=false;
  }
}
loading: boolean = false;
connecttoASMS()
{

this.spinner.show();
  setTimeout(() => {
    this.loading=false;
    window.open(this.asmsurl.toString(),'_self');
    this.spinner.hide();
  }, 2000); 
 
}

getASMSLoginCrenditails()
{

   return this.http.get<any>(environment.apiurl+'List/GetEmployeeByIdForASMS').subscribe((response:any)=>{
  this.asmsDetails=response;
  console.log('asmsDetails  '+response['oldasmsurl']);
  this.asmsurl=this.asmsDetails['oldasmsurl'];
  console.log('My url' +this.asmsurl);
  });
  
}
}

