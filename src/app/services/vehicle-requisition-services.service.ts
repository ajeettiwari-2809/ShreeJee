import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleRequest } from '../Model/vehicleRequest';
import { Router } from '@angular/router';
import { SecurityVehicleForm } from '../Model/SecurityvehicleEntry';
import { AllVehicleType } from '../Model/AllVehicleType';
import {AllVehicleFromType} from '../Model/AllVehicleFromType';
import { Subject, Observable } from 'rxjs';
import { DriverFRomTypes } from '../Model/DriverFRomtype';
import { getAutoVehicleData } from '../Model/getAutoVehicledata';
import { getvehicledataauto } from '../Model/getVehicleData';
import { AllDepartmentType } from '../Model/Department';


@Injectable({
  providedIn: 'root'
})
export class VehicleRequisitionServicesService {
  private vehiclelistener = new Subject<any>();
  private vehiclelistenerauto = new Subject<any>();
  private driverlistenerauto = new Subject<any>();

  private loginListener = new Subject<any>();
  private requestTypeListener = new Subject<any>();
  private requestForListener = new Subject<any>();
  private vehilceReqiestLintner = new Subject<any>();

  private vehilceReqiestLintnerH = new Subject<any>();
  private vehicleRejectionByUserListener = new Subject<any>();
  private vehicleApprovalListHODListener= new Subject<any>();
  data:any;
  vehicleRequest: any;
  
  constructor(private http: HttpClient,private router: Router,) { }

 

  getRequestTypeListener(){
    return this.requestTypeListener.asObservable();
  }
  getRequestForListener(){
    return this.requestForListener.asObservable();
  }

  getVehicleRequestListener(){
    return this.vehilceReqiestLintner.asObservable();
  }

  getVehicleRequestListenerH(){
    return this.vehilceReqiestLintnerH.asObservable();
  }

  getVehileRejectionByuserListener(){
    return this.vehicleRejectionByUserListener.asObservable();
  }
 
  getVehicleApprovalListHODListener(){
    return this.vehicleApprovalListHODListener.asObservable();
  }
  getRequestType(){
    console.log('request type andar');
    return this.http.get(environment.apiurl + 'AllApplication/getVehicleRequestType').subscribe((response: any) => {
    
      this.requestTypeListener.next(response);
    })
  }



  getvehiclelistener(){
    return this.vehiclelistener.asObservable();
  }
  getRequestFor(){
    console.log('request For ke andar');
    return this.http.get(environment.apiurl + 'AllApplication/getGetVehicleRequestFor').subscribe((response: any) => {
      this.requestForListener.next(response);
    })
  }
  submitVehicleRequestService(formData){
    return this.http.post(environment.apiurl + 'AllApplication/vehicleRequest', formData);
  }

  getVehicleRequistList(vehicleRequest){
    let inputResource = new VehicleRequest();
    //inputResource.status = 6;
    inputResource.userCode = vehicleRequest.userCode;
    inputResource.pageNo = vehicleRequest.pageNo;
    inputResource.pageSize = vehicleRequest.pageSize;
    console.log('input resource', inputResource);
    return this.http.post<{vehicleRequiest: VehicleRequest}>(environment.apiurl + 'AllApplication/getVehicleRequsitionList', inputResource);
  }

  

  getVehicleEntryListener(){
    return this.vehiclelistener.asObservable();
  }

  getVehicleEntryListenerauto(){
    return this.vehiclelistenerauto.asObservable();
  }

  getDriverlistenetuto()
  {
    return this.driverlistenerauto.asObservable();
  }
  //vehiclelistenerauto
 



  AddVehicleentryform(vehicle: SecurityVehicleForm){
    console.log(" before api hit");
    return this.http.post<SecurityVehicleForm>(environment.apiurl + 'AllApplication/addVehicleGetInOut', vehicle)
   .subscribe(response => {
    
     this.router.navigate(['/VehicleEntryForm']);
     this.vehiclelistener.next(response);

   });


   
 }

 getAllvehicledata(vehicledata: getvehicledataauto){

  console.log(" before api hit");
  console.log(vehicledata);
  return this.http.post<getvehicledataauto>(environment.apiurl + 'AllApplication/GetRegisteredVehicleAndDriverForGetIn', vehicledata)
 .subscribe(response => {
  
  console.log("our result is :" + response);
   //this.router.navigate(['/VehicleEntryForm']);
   this.vehiclelistenerauto.next(response);

 });


 
}
getAllDriverdata(vehicledata: getvehicledataauto){

  console.log(" before api hit");
  console.log(vehicledata);
  return this.http.post<getvehicledataauto>(environment.apiurl + 'AllApplication/GetRegisteredVehicleAndDriverForGetIn', vehicledata)
 .subscribe(response => {
  
  console.log("our result is :" + response);
   //this.router.navigate(['/VehicleEntryForm']);
   this.driverlistenerauto.next(response);

 });


 
}

 getVehicleType(): Observable<AllVehicleType[]> {
  return this.http.get<AllVehicleType[]>(environment.apiurl + 'getVehicleType');
}

getDepartment(): Observable<AllDepartmentType[]> {
  return this.http.get<AllVehicleType[]>(environment.apiurl + 'getDepartment');
}


getVehicleFromType(): Observable<AllVehicleFromType[]> {
  return this.http.get<AllVehicleFromType[]>(environment.apiurl + 'getVehicleFrom');
}


//getAutoVehicleData

getVehicleData(inputdata)
 {
  return this.http.post(environment.apiurl + 'AllApplication/GetRegisteredVehicleAndDriverForGetIn',inputdata);
}


DriverFrom(): Observable<DriverFRomTypes[]> {
  return this.http.get<DriverFRomTypes[]>(environment.apiurl + 'getDriverFrom');
}




  getVehicleRequistByID(id: number){
    return this.http.get<VehicleRequest>(environment.apiurl + 'AllApplication/getVehicleRequisitionById/' + id).subscribe((response: any) => {
      this.vehilceReqiestLintner.next(response);
      
    })
  }


  //for history setup start------------
  getVehicleRequistByID1(id: number){
    return this.http.get<VehicleRequest>(environment.apiurl + 'AllApplication/getVehicleRequisitionById/' + id).subscribe((response: any) => {
      this.vehilceReqiestLintnerH.next(response);
    })
  }
    //for history setup end------------

  vehicleRequiestRejectionByUser(vehilcerequiest: VehicleRequest){
    let inputResource = new VehicleRequest();
    inputResource.Status = 5;
      return this.http.put<VehicleRequest>(environment.apiurl + 'AllApplication/leadVerifyForBTM/' + vehilcerequiest.id, inputResource)
    .subscribe(response => {
      this.vehicleRejectionByUserListener.next(response);
      //this.router.navigate(['/leadListForApproval']);
     /*  this.leadVerificationListener.next(response.leads); */
     // this.alertify.success("Lead Rejected successfully");
  
    });
  }
  getVehicleApprovalListHOD(vehicleRequest:VehicleRequest){
    let postData= new VehicleRequest;
    postData.userCode = vehicleRequest.userCode;
    postData.pageNo = vehicleRequest.pageNo;
    postData.pageSize = vehicleRequest.pageSize;
   /// this.vehicleApprovalListHODListener.next(response);
      return this.http.post(environment.apiurl+'ApprovalControllers/GetVehicleApprovalListHOD',postData);
  }
  getApprovalRequistByID(id: number){
    
    return this.http.get(environment.apiurl + 'AllApplication/getVehicleRequisitionById/'+id).subscribe((response: any) => {
      this.vehicleApprovalListHODListener.next(response);

      
    });
  }
}