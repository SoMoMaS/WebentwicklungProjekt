import { Injectable } from '@angular/core';

const tokenKey = 'auth-token';
const userKey = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // In case the user loggs out we clear the token.
  logOut(){
    window.sessionStorage.clear()
  }

  saveToken(tokenToSave: string){
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, tokenToSave);
  }

  getToken(){
    return window.sessionStorage.getItem(tokenKey);
  }

  saveUser(user: string){
    window.sessionStorage.removeItem(userKey);
    window.sessionStorage.setItem(userKey, user);
  }

  getUser(){
    return window.sessionStorage.getItem(userKey);
  }
}
