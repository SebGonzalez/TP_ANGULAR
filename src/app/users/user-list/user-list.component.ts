import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  usersSubscription: Subscription;
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitReferenceSubject();
  }

  onEditUser(id: number) {
    this.router.navigate(['/user', 'edit', id]);
  }

  onCreateUser() {
    this.router.navigate(['/user/create']);
  }
}
