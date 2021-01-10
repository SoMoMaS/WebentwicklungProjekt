import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webRequestService: WebRequestService) { }

  login(loginData: Object){
    return this.webRequestService.post('auth/login', loginData);
  }
}
