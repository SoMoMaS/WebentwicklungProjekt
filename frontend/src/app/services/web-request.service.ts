import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  private readonly root_URL: string;
  constructor(private http:HttpClient) {
    this.root_URL = 'http://localhost:3000';
  }

  get(uri: string){
    return this.http.get(`${this.root_URL}/${uri}`);
  }

  post(uri: string, payload: Object){
    return this.http.post(`${this.root_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object){
    return this.http.put(`${this.root_URL}/${uri}`, payload).subscribe((response) =>{
      console.log(response);
    });
  }

  delete(uri: string, payload: Object){
    console.log('payload from webreq ser');
    console.log(payload);
    return this.http.delete(`${this.root_URL}/${uri}`, payload).subscribe((response) =>{
      console.log(response);
    });
  }

}
