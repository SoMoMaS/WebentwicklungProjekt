import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import {MatSnackBar} from '@angular/material/snack-bar';

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
  

  constructor(
            private loginService : LoginService, 
            private tokenStorage: TokenStorageService, 
            private router: Router,
            private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }


  onLoginButtonClicked(){
    
    var username = this.loginData.username;
    var password = this.loginData.password

    return this.loginService.login({username , password}).subscribe((response: any) =>{
        console.log(response);

        if(response.statusCode === 200){
            this.snackBar.open('Login sucessful','', {
              duration: 2000,
            });
            this.tokenStorage.saveToken(response.token);
            this.tokenStorage.saveUser(response.uniqID);
            this.router.navigate(['/home']);
        }
        
    });
  }
}
