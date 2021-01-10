import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const tokenHeader = 'x-access-token';
@Injectable()
export class AuthentificationHelperInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //let request = req;

    // Getting token from the window storage
    let token = this.tokenStorage.getToken();

    // Testing
    console.log('Got into the auth helper and adding the jwt token to the header if there is avaliable ')

    // Adding token to the header
    if(token != null){
        request = request.clone({ headers: request.headers.set(tokenHeader, token) });
    }

    return next.handle(request);
  }
}

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthentificationHelperInterceptor, multi: true }
// ];
