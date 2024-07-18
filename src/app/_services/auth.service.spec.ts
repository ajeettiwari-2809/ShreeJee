import { TestBed } from '@angular/core/testing';

//import { AuthService } from '../auth.service';
import { AuthTokenService } from '../login/auth-token.service';


// describe('AuthService', () => {

//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: AuthTokenService = TestBed.inject(AuthTokenService);
//     expect(service).toBeTruthy();
//   });
// });

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});