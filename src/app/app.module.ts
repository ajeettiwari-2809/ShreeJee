import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//  import {NgxPrintModule} from 'ngx-print';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopnavComponent } from './topnav/topnav.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

 import {MatInputModule} from '@angular/material/input';
 import {MatRadioModule} from '@angular/material/radio';
 import {MatSelectModule} from '@angular/material/select';
 import {MatCheckboxModule} from '@angular/material/checkbox';

 import {MatCardModule} from '@angular/material/card';
 import {MatIconModule} from '@angular/material/icon';
 import {MatButtonModule} from '@angular/material/button';
 import {MatDatepickerModule} from '@angular/material/datepicker';
 import {MatNativeDateModule} from '@angular/material/core';
 import {MatDividerModule} from '@angular/material/divider';
 import {MatExpansionModule} from '@angular/material/expansion';
 import { MatListModule} from '@angular/material/list';
 import {MatPaginatorModule} from '@angular/material/paginator';
 import { DateAdapter} from '@angular/material/core';
 import {MAT_DATE_LOCALE} from '@angular/material/core';
 import { MAT_DATE_FORMATS } from '@angular/material/core';
 import {MatTableModule} from '@angular/material/table';
//  -----------------------------
 import {MatDialogModule} from '@angular/material/dialog';
import {MatTable}from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
//import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { ExcelService } from './_services/excel.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeaderComponent } from './SCREENS/header/header.component';
import { HomeComponent } from './SCREENS/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    
   

    

    
    
   
  ],
  imports: [
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgbModule,
    
    FormsModule,
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
   
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,

    MatFormFieldModule,
    MatTableModule,
    // MatTable,
    
    //NgxMaterialTimepicker24HoursFaceComponent,
    ToastrModule.forRoot({
    //  positionClass: "toast-bottom-right"
       positionClass: "toast-top-center"
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
    
  ],
  exports:[
    MatProgressSpinnerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    
   
    MatPaginatorModule,
   
  
    MatFormFieldModule,
    
    MatNativeDateModule,
   
  ],
  
  providers: [ DatePipe, ExcelService,LoginComponent, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
