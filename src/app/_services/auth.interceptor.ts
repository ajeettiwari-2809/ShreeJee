import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AuthTokenService } from '../login/auth-token.service';
//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService,
    private authTokenService:AuthTokenService
    ) {
      
    }
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    const token = this.authTokenService.getToken();

    const authRequest = req.clone({

    
        headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    console.log("Our token data set is");
    console.log(  "all token  -" + token);
    return next.handle(authRequest);
  }
}

// import { HttpInterceptor } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthTokenService } from '../login/auth-token.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authTokenService: AuthTokenService) {}
//   intercept(
//     req: import('@angular/common/http').HttpRequest<any>,
//     next: import('@angular/common/http').HttpHandler
//   ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {

//     const token = this.authTokenService.getToken();
   
   
//     console.log(  "all token -" + token);
//     const authRequest = req.clone({
//         headers: req.headers.set('Authorization', 'Bearer ' + token)
//     });

//        // console.log("Our token data set is");
   
//     return next.handle(authRequest);
//   }
// }