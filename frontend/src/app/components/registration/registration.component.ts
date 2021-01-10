import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';

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

  constructor(private registrationService : RegistrationService) {}

 
 
  
  ngOnInit(): void {
   
  }

  onSignupButtonClicked(){
    
    var username = this.registerData.username;
    var password = this.registerData.password
    return this.registrationService.createUser({username , password}).subscribe((response: any) =>{
      this.errorMessage = response;
    });
  }


}


