import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private typeUser: string;
  constructor() {
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
            this.typeUser = 'ok';
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
