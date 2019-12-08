import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private typeUser: string;
  constructor(private httpClient: HttpClient) {
    this.typeUser = 'NonConnecte';
  }

  getTypeUser() {
    return this.typeUser;
  }

  signOutUser() {
    this.typeUser = 'NonConnecte';
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            this.setTypeUser(email);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  setTypeUser(email: string) {
    const url  = 'http://localhost:3000/users?mail=' + email;
    console.log('URL : ' + url);
    this.httpClient
      .get<User[]>(url)
      .subscribe(
        (response) => {
          console.log('Reponse : ' + response + ' yeah ' + response[0]);
          this.typeUser = response[0].type;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
