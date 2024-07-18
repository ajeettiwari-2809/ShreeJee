import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

// import { VpoolReportComponent } from './reports/vpool-report/vpool-report.component';

import { AuthGuard } from './_services/auth.guard';
import { HeaderComponent } from './SCREENS/header/header.component';
import { HomeComponent } from './SCREENS/home/home.component';





const routes: Routes = [
  { path: '', component: HomeComponent },


  //  {path: 'Printdetail',component:GateINOutComponent},
  //
 // {path: 'logindata', component: LoginComponent},

  
  //this.router.navigateByUrl('vehicleentryform');


  
  //{ path: 'vehicleform', component: VehiclerequestformComponent },
 // {path: 'vehiclRequest',redirectTo:'/VehicleRequestFormComponent',pathMatch: 'full'},
 // redirectTo: '/products', pathMatch: 'full'



  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [

     
     
      
      { path: 'home', component: HomeComponent },
    

      ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
      export class AppRoutingModule {   

    
}
