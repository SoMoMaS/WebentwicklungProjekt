import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  posts: Post[];

  constructor(private userService: UserService) {
   
   }

   ngOnInit() {

    }

}
