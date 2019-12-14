import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) {
    this.getUsersFromBack();
  }

  emitReferenceSubject() {
    this.usersSubject.next(this.users);
  }

  getUsersFromBack() {
    console.log('Lecture des ref :');
    this.httpClient
      .get<User[]>('http://localhost:3000/users')
      .subscribe(
        (response) => {
          this.users = response;
          this.emitReferenceSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSingleUser(id: number) {
    return this.users[id];
  }
}
