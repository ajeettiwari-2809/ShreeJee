import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';


class DashboardModel{
  getinstatus: string;
  getoutstatus:string;
  pendinggetinout:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

dashboard:DashboardModel;
  constructor(private http:HttpClient,private router: Router) { }
  asmsDetails:any;
  asmsurl:String;
  ngOnInit(): void {
this.getVehicleRequestList();
this.getASMSLoginCrenditails();
this.asmsurl;


  }

 
// getDashboardData(){
//   this.http.post<any>(environment.apiurl+'DashBoard/getOutsideGetInOutDashbaordCount','').subscribe((response:any)=>{
//     this.dashboard=response.body;
//     console.log('Dashboard  '+response.body);
//     });
// }
getVehicleRequestList()
  {
      return this.http.post<DashboardModel>(environment.apiurl + 'DashBoard/getOutsideGetInOutDashbaordCount','').subscribe((res)=>{
      this.dashboard=res[0];
      }
    );
  }

  openweb(urldata)
  {
if(urldata =='')
{
  window.open(this.asmsurl.toString(),'_self');
}
else 
{
  window.open(urldata,'_self');
}
    
  }

  bookVehicle()
  {
    this.router.navigate(['/vehicle-application']);
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
