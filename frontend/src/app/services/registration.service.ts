import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private webRequestService : WebRequestService) { }

  createUser(registrationData: Object){
      return this.webRequestService.post('auth/register', registrationData);
  }
}
