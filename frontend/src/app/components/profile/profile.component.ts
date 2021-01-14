import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from '../../models/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User;
  constructor(
    private profileService : 
    ProfileService, private tokenStorage: 
    TokenStorageService, private router: Router,
    private snackBar: MatSnackBar) {
    this.user = new User();
   }

  ngOnInit(): void {
    var token = this.tokenStorage.getToken();
    if(token === null){
      this.router.navigate(['/login']);
    }

  }

  onSubmit(){

    var uniqUserID = this.tokenStorage.getUser();
    this.user.uniqID = uniqUserID;

    this.profileService.updateUserData(this.user);
    this.snackBar.open('Profil data updated.', '',{
      duration: 2000,
    });
    this.router.navigate(['/home']);
  }

}
