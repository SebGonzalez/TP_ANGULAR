import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import * as firebase from 'firebase';
import {TypeUser} from '../services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (!user) {
          this.userService.setTypeUser(TypeUser.NONCONNECTE);
        }
      }
    );
  }

  onSignOut() {
    this.userService.signOutUser();
  }

}
