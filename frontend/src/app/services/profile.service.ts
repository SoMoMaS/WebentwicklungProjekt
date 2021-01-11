import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { User } from '.././models/user';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private webRequestService: WebRequestService) { }

  updateUserData(user: User){

    console.log('Got into the profile service.');
    var users = 'users/';
    var uri = users.concat(user.uniqID)

    return this.webRequestService.put(uri, user);
  }
}
