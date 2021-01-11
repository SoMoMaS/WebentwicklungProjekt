import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : User;
  constructor(private profileService : ProfileService, private tokenStorage: TokenStorageService) {
    this.user = new User();
   }

  ngOnInit(): void {
  }

  onSubmit(){


    var uniqUserID = this.tokenStorage.getUser();
    this.user.uniqID = uniqUserID;

    console.log(this.user);
    this.profileService.updateUserData(this.user);
  }

}
