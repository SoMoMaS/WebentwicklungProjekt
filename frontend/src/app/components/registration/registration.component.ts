import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {

 registerData: any = {
  username: '',
  password: ''
}

errorMessage: String = '';

  constructor(private registrationService : RegistrationService,
              private snackBar: MatSnackBar,
              private router: Router) {}

 
 
  
  ngOnInit(): void {
   
  }

  onSignupButtonClicked(){
    
    var username = this.registerData.username;
    var password = this.registerData.password
    return this.registrationService.createUser({username , password}).subscribe((response: any) =>{
      console.log(response);

      if(response.statusCode == 400){
        this.snackBar.open(response)
      }
      else{
        this.snackBar.open('Registration was successful, please log in.','', {
          duration: 2000,
        });
        
        this.router.navigate(['/login']);
      }
    });
  }


}


