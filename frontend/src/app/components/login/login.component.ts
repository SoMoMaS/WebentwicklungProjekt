import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: any = {
    username: '',
    password: ''
  }

  errorMessage: String = '';
  

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }


  onLoginButtonClicked(){
    
    var username = this.loginData.username;
    var password = this.loginData.password

    return this.loginService.login({username , password}).subscribe((response: any) =>{
        console.log(response);
        
    });
  }
}